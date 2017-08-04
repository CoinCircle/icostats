// @flow
/* eslint-disable no-console */
import winston from 'winston';
import has from 'lodash/has';
import { normalize as normalizeICO } from 'lib/icos';
import icoData from 'lib/ico-data';
import { cache } from 'app';
import PriceHistory from 'models/price-history';
import * as shapeshift from 'shared/lib/shapeshift';

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default async function icos() {
  const startAll = Date.now();

  let priceHistories = cache.get('priceHistories');

  if (!priceHistories) {
    winston.warn(`Price histories not in cache: Querying mongo for new data`);
    try {
      priceHistories = await PriceHistory.find().select('-prices').lean().exec();
      const endPriceHistories = Date.now();
      const msPriceHistories = endPriceHistories - startAll;

      winston.info(`Querying mongo for PriceHistory for icos resolver took ${msPriceHistories}ms`);

      cache.set('priceHistories', priceHistories, ONE_MINUTE * 10);

    } catch (err) {
      winston.error(`Failed to get price histories from mongo: ${err.message}`);
    }
  }

  const pricesBySymbol = priceHistories.reduce((obj, model) => ({
    ...obj,
    [model.symbol]: model.latest
  }), {});
  // when new tokens are added, it takes a bit for their price history to
  // be added to the db. So just leave that token out for now if so.
  const validICOs = icoData.filter(ico => has(pricesBySymbol, ico.symbol));
  const results = validICOs.map(data => ({
    ...data,
    ...pricesBySymbol[data.symbol],
    id: data.id
  }));

  // get shapeshift info
  let shapeshiftCoins = cache.get('shapeshiftCoins');

  if (!shapeshiftCoins) {
    const start = Date.now();

    winston.warn('Shapeshift data not in cache - refetching');
    try {
      shapeshiftCoins = await shapeshift.getCoins();
      const end = Date.now();
      const ms = end - start;

      winston.info(`Fetched shapeshift coin list in ${ms}ms`);

      cache.set('shapeshiftCoins', shapeshiftCoins, ONE_DAY);
    } catch (err) {
      winston.error('Failed to fetch shapeshift coins: %s', err.message);
      shapeshiftCoins = {};
    }
  }

  // Get the current ETH/BTC price
  const eth = priceHistories.find(p => p.symbol === 'ETH');
  const btc = priceHistories.find(p => p.symbol === 'BTC');
  const ethPrice = eth.latest.price_usd;
  const btcPrice = btc.latest.price_usd;

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
