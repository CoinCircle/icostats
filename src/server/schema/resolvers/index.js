/* eslint-disable no-console, max-statements */
import winston from 'winston';
import fetch from 'isomorphic-fetch';
import { redis } from 'app';
import GraphQLJSON from 'graphql-type-json';
import { normalize as normalizeICO } from 'lib/icos';
import { sendMail } from 'lib/mail';
import Price from 'models/price';
import * as shapeshift from 'shared/lib/shapeshift';
import getExchangeService from 'shared/lib/exchange.service';
import * as agg from '~/lib/aggregate-price-history';
import icoData from '~/lib/ico-data';
import icos from './icos';

export default {
  Query: {
    icos,
    async prices(obj, { tickers }) {
      const doc = await Price.find({ ticker: { $in: tickers }});

      return doc;
    },
    async recentPrices() {
      let recentPrices;

      try {
        recentPrices = await redis.get('recentPrices');
      } catch (e) {
        throw Error(e.message);
      }

      if (!recentPrices) {
        winston.warn(`recentPrices not in cache: Querying mongo for new data`);
        try {
          const startRecentPrices = Date.now();

          recentPrices = await agg.getRecentPrices();
          const endRecentPrices = Date.now();
          const msRecentPrices = endRecentPrices - startRecentPrices;

          winston.info(`Querying mongo for Tickers for icos resolver took ${msRecentPrices}ms`);

          await redis.set('recentPrices', JSON.stringify(recentPrices));

        } catch (err) {
          winston.error(`Failed to get recentPrices from mongo: ${err.message}`);
        }
      } else {
        recentPrices = JSON.parse(recentPrices);
      }

      const recents = icoData.map(ico => ({
        symbol: ico.symbol,
        recent_prices: recentPrices[ico.id] || {}
      }));

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
