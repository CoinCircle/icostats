/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import { normalize as normalizeICO } from 'lib/icos';
import icoData from 'lib/ico-data';
import { fetchEthPriceAtDate } from 'lib/cryptowatch';
import { fetchCurrentPrice } from 'lib/gdax';
import { cache } from 'app';
import EthPrice from 'models/eth-price';
import BtcPrice from 'models/btc-price';
import { sendMail } from 'lib/mail';

export default {
  Query: {
    async icos() {
      const promises = icoData.map(async (data) => {
        const url = `https://api.coinmarketcap.com/v1/ticker/${data.ticker}/`;
        let obj = cache.get(url);

        if (!obj) {
          const response = await fetch(url);

          obj = await response.json();

          if (Array.isArray(obj)) {
            obj = obj[0];
          }

          cache.set(url, obj);
        } else {
          console.log('found URL in cache: (%s)', url);
        }

        return {
          ...data,
          ...obj,
          // This one conflicts
          id: data.id
        };
      });
      const results = await Promise.all(promises);

      // Get the current ETH price
      let ethPrice = cache.get('ethPrice');
      let btcPrice = cache.get('btcPrice');

      if (!ethPrice) {
        try {
          ethPrice = await fetchCurrentPrice('ETH');
        } catch (e) {
          const latest = await EthPrice.findOne().sort('-timestamp');

          ethPrice = latest.usd_price;
          console.log('Fetched fallback ETH price (%s) from db.', ethPrice);
        }
        cache.set('ethPrice', ethPrice);
      }

      if (!btcPrice) {
        try {
          btcPrice = await fetchCurrentPrice('BTC');
        } catch (e) {
          const latest = await BtcPrice.findOne().sort('-timestamp');

          btcPrice = latest.usd_price;
          console.log('Fetched fallback BTC price (%s) from db.', btcPrice);
        }
        cache.set('btcPrice', btcPrice);
      }

      return results.map(ico => normalizeICO(ico, ethPrice, btcPrice));
    },
    async ico(obj, { id }) {
      const url = `https://api.coinmarketcap.com/v1/ticker/${id}/`;
      const response = await fetch(url);
      const json = await response.json();
      const data = Array.isArray(json) ? json[0] : json;

      return normalizeICO(data);
    }
  },
  Mutation: {
    async sendMail(_, { name, email, message }) {
      const success = await sendMail(name, email, message);

      return success ? 'success' : 'failed';
    }
  }
};
