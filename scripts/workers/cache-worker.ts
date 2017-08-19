import * as mongoose from 'mongoose';
import * as settings from 'settings';
import * as Redis from 'ioredis';
import * as winston from 'winston';
import {
  getLatestPrices,
  getRecentPrices,
  ILatestPrice
} from 'server/lib/aggregate-price-history';
import pubsub from 'server/lib/pubsub';
import * as topics from 'server/lib/pubsub.topics';
import * as tokens from 'server/lib/ico-data';
import { collectGarbage, connectMongoose } from './utils';

const db = connectMongoose();
const redis = new Redis(settings.REDIS_URI);


/* =============================================================================
=    ICO Resolver
============================================================================= */
export async function refreshLatestPrices() {

  winston.info(`[cache-worker] refreshLatestPrices`);

  try {
    const latestPrices = await getLatestPrices();
    const cached = await redis.get('latestPrices');
    const parsedCache = JSON.parse(cached);

    publishDiffs(latestPrices, parsedCache);

    await redis.set('latestPrices', JSON.stringify(latestPrices));
  } catch (e) {
    winston.error(e.message);
  }

  collectGarbage(db);
}

interface IPricesById {
  [tokenId: string]: ILatestPrice
}
const publishDiffs = (prices: ILatestPrice[], parsedCache) => {
  const nextPricesById: IPricesById = prices.reduce((obj, current) => ({
    ...obj,
    [current.id]: current.latestPrice
  }), {});
  const parsed = <ILatestPrice[]>parsedCache;
  const pricesById: IPricesById = parsed.reduce((obj, current) => ({
    ...obj,
    [current.id]: current.latestPrice
  }), {});
  const symbolById = tokens.reduce((obj, current) => ({
    ...obj,
    [current.id]: current.symbol
  }));

  Object.entries(pricesById).forEach(([id, current]) => {
    const next = nextPricesById[id];
    const symbol = symbolById[id];

    if (current !== next) {
      console.log('current !== next on' + id);
      const payload = {
        icoPriceChanged: { symbol, price: next }
      };

      pubsub.publish(topics.ICO_PRICE_CHANGED, payload);
    }
  });
}

const publishDiff = async (price: ILatestPrice, cached: Object) => {

}

/* =============================================================================
=    Recent Prices
============================================================================= */
export async function refreshRecentPrices() {

  winston.info(`[cache-worker] refreshRecentPrices`);

  try {
    const recentPrices = await getRecentPrices();

    await redis.set('recentPrices', JSON.stringify(recentPrices));
  } catch (e) {
    winston.error(e.message);
  }

  collectGarbage(db);
}
