// @flow
/* eslint-disable no-console, max-statements */
import winston from 'winston';
import has from 'lodash/has';
import { normalize as normalizeICO } from 'lib/icos';
import icoData from 'lib/ico-data';
import { cache, redis } from 'app';
import { getLatestPrices } from '~/lib/aggregate-price-history';
import * as shapeshift from 'shared/lib/shapeshift';

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default async function icos() {
  const startAll = Date.now();

  let latestPrices;

  try {
    latestPrices = await redis.get('latestPrices');
  } catch (e) {
    throw Error(e.message);
  }

  if (!latestPrices) {
    winston.warn(`latestPrices not in cache: Querying mongo for new data`);
    try {
      latestPrices = await getLatestPrices();
      const endLatestPrices = Date.now();
      const msLatestPrices = endLatestPrices - startAll;

      winston.info(`Querying mongo for Tickers for icos resolver took ${msLatestPrices}ms`);

      await redis.set('latestPrices', JSON.stringify(latestPrices));

    } catch (err) {
      winston.error(`Failed to get latestPrices from mongo: ${err.message}`);
    }
  } else {
    latestPrices = JSON.parse(latestPrices);
  }

  const pricesById = latestPrices.reduce((obj, curr) => ({
    ...obj,
    [curr.id]: {
      price_usd: curr.latestPrice,
      timestamp: curr.timestamp
    }
  }), {});

  // when new tokens are added, it takes a bit for their price history to
  // be added to the db. So just leave that token out for now if so.
  const validICOs = icoData.filter(ico => has(pricesById, ico.id));
  const results = validICOs.map(data => ({
    ...data,
    ...pricesById[data.id],
    id: data.id
  }));

  // get shapeshift info
  let shapeshiftCoins = await redis.get('shapeshiftCoins');

  if (!shapeshiftCoins) {
    const start = Date.now();

    winston.warn('Shapeshift data not in cache - refetching');
    try {
      shapeshiftCoins = await shapeshift.getCoins();
      const end = Date.now();
      const ms = end - start;

      winston.info(`Fetched shapeshift coin list in ${ms}ms`);

      await redis.set('shapeshiftCoins', JSON.stringify(shapeshiftCoins));
    } catch (err) {
      winston.error('Failed to fetch shapeshift coins: %s', err.message);
      shapeshiftCoins = {};
    }
  } else {
    shapeshiftCoins = JSON.parse(shapeshiftCoins);
  }

  // Get the current ETH/BTC price
  const eth = pricesById.ethereum;
  const btc = pricesById.bitcoin;
  const ethPrice = eth && eth.price_usd;
  const btcPrice = btc && btc.price_usd;

  const startNormalize = Date.now();
  const res = results.map(ico =>
    normalizeICO(ico, ethPrice, btcPrice, shapeshiftCoins)
  );
  const endNormalize = Date.now();
  const msNormalize = endNormalize - startNormalize;

  winston.info(`Normalized ICOs in ${msNormalize}ms`);
  winston.info(`ICO resolver took ${startAll - Date.now()}ms`);

  return res;
}
