/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import { cache } from 'app';
import { normalize as normalizeICO } from 'lib/icos';
import { sendMail } from 'lib/mail';
import recentPrices from 'lib/recentPrices';
import Price from 'models/price';
import icos from './icos';

export default {
  Query: {
    icos,
    async prices(obj, { tickers }) {
      const doc = await Price.find({ ticker: { $in: tickers }});

      return doc;
    },
    async recentPrices() {
      const ONE_MINUTE = 60;
      const ONE_HOUR = ONE_MINUTE * 60;
      const SIX_HOURS = ONE_HOUR * 6;
      let recents = cache.get('recentPrices');

      if (!recents) {
        const doc = await Price.find();

        recents = recentPrices(doc);
        cache.set('recentPrices', recents, SIX_HOURS);
      }

      return recents;
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
