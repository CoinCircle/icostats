/* eslint-disable no-console */
import winston from 'winston';
import fetch from 'isomorphic-fetch';
import { cache } from 'app';
import GraphQLJSON from 'graphql-type-json';
import { normalize as normalizeICO } from 'lib/icos';
import { sendMail } from 'lib/mail';
import recentPrices from 'lib/recentPrices';
import Price from 'models/price';
import PriceHistory from '~/models/price-history';
import * as shapeshift from 'shared/lib/shapeshift';
import getExchangeService from 'shared/lib/exchange.service';
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
      const FIFTEEN_MINUTES = ONE_MINUTE * 15;

      let recents = cache.get('recentPrices');

      if (!recents || !recents.length) {
        const doc = await Price.find().lean().exec();
        const priceHistory = await PriceHistory.find().lean().exec();

        winston.info('No recent prices in cache - re-calculating.');
        recents = recentPrices(doc, priceHistory);
        cache.set('recentPrices', recents, FIFTEEN_MINUTES);
      }

      return recents;
    },
    async ico(obj, { id }) {
      const url = `https://api.coinmarketcap.com/v1/ticker/${id}/`;
      const response = await fetch(url);
      const json = await response.json();
      const data = Array.isArray(json) ? json[0] : json;

      return normalizeICO(data);
    },
    async shapeshiftCoins() {
      const coins = await shapeshift.getCoins();

      return coins;
    },
    async getPrice(obj, { a, b }) {
      const exchangeService = getExchangeService();
      const price = await exchangeService.fetchPrice(a, b);

      return price;
    }
  },
  Mutation: {
    async sendMail(_, { name, email, message }) {
      const success = await sendMail(name, email, message);

      return success ? 'success' : 'failed';
    }
  },
  JSON: GraphQLJSON
};
