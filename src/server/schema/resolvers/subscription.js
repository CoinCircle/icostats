import { cache, redis } from 'app';
import { withFilter } from 'graphql-subscriptions';
import pubsub from '~/lib/pubsub';
import * as topics from '~/lib/pubsub.topics';
import icoData from '~/lib/ico-data';
import { normalize } from '~/lib/icos';

const Subscription = {
  icoPriceChanged: {
    resolve: async (payload) => {
      const { icoPriceChanged: { symbol, price }} = payload;
      const ico = icoData.find(el => el.symbol === symbol);

      // match the schema
      ico.price_usd = price;

      let latestPrices = await redis.get('latestPrices');
      let shapeshiftCoins = await redis.get('shapeshiftCoins');

      latestPrices = JSON.parse(latestPrices);
      shapeshiftCoins = JSON.parse(shapeshiftCoins);

      const eth = latestPrices.find(o => o.id === 'ethereum');
      const btc = latestPrices.find(o => o.id === 'bitcoin');
      const ethPrice = eth && eth.latestPrice;
      const btcPrice = btc && btc.latestPrice;

      const res = normalize(ico, ethPrice, btcPrice, shapeshiftCoins);
      debugger;
      return res;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator(topics.ICO_PRICE_CHANGED),
      (payload) => {
        const isValid = payload && payload.icoPriceChanged &&
          payload.icoPriceChanged.symbol;

        if (!isValid) {
          return false;
        }

        return true;
      }
    )
  }
};

export default Subscription;
