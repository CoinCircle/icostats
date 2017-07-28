import { cache } from 'app';
import { withFilter } from 'graphql-subscriptions';
import pubsub from '~/lib/pubsub';
import * as topics from '~/lib/pubsub.topics';
import icoData from '~/lib/ico-data';
import { normalize } from '~/lib/icos';

const Subscription = {
  icoPriceChanged: {
    resolve: (payload) => {
      const { icoPriceChanged: { symbol, price }} = payload;
      const ico = icoData.find(el => el.symbol === symbol);

      // match the schema
      ico.price_usd = price;

      const priceHistories = cache.get('priceHistories');
      const shapeshiftCoins = cache.get('shapeshiftCoins');
      const eth = priceHistories.find(p => p.symbol === 'ETH');
      const btc = priceHistories.find(p => p.symbol === 'BTC');
      const ethPrice = eth.latest.price_usd;
      const btcPrice = btc.latest.price_usd;

      return normalize(ico, ethPrice, btcPrice, shapeshiftCoins);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator(topics.ICO_PRICE_CHANGED),
      (payload) => {
        const isValid = payload && payload.icoPriceChanged &&
          payload.icoPriceChanged.symbol;

        if (!isValid) {
          return false;
        }
        // If any data we need is not already cached, then don't try publish
        // the change. It's not worth the cost.
        if (!cache.get('shapeshiftCoins')) {
          return false;
        }
        if (!cache.get('priceHistories')) {
          return false;
        }

        return true;
      }
    )
  }
};

export default Subscription;
