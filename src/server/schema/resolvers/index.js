/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import { normalize as normalizeICO } from 'lib/icos';
import { sendMail } from 'lib/mail';
import Price from 'models/price';
import icos from './icos';

export default {
  Query: {
    icos,
    async prices(obj, { tickers }) {
      const doc = await Price.find({ ticker: { $in: tickers }});

      return doc;
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
