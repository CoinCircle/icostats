import * as mongoose from 'mongoose';
import * as settings from 'settings';
import * as Redis from 'ioredis';
import * as winston from 'winston';
import {
  getLatestPrices,
  getRecentPrices
} from 'server/lib/aggregate-price-history';
import * as Token from 'server/models/Token';
import { collectGarbage, connectMongoose } from './utils';

const db = connectMongoose();
const redis = new Redis(settings.REDIS_URI);

/* =============================================================================
=    Tokens
============================================================================= */
export async function refreshTokens() {
  winston.info(`[cache-worker] refreshTokens - Updating tokens`);
  try {
    const tokens = await Token.find().lean().exec();

    await redis.set('tokens', JSON.stringify(tokens));
  } catch (e) {
    winston.error(e.message);
  }

  collectGarbage(db);
}


/* =============================================================================
=    ICO Resolver
============================================================================= */
export async function refreshLatestPrices() {
  winston.info(`[cache-worker] refreshLatestPrices`);
  try {
    const latestPrices = await getLatestPrices();

    await redis.set('latestPrices', JSON.stringify(latestPrices));
  } catch (e) {
    winston.error(e.message);
  }

  collectGarbage(db);
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
