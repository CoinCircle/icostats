/* eslint-disable no-console */
import winston from 'winston';
import has from 'lodash/has';
import { normalize as normalizeICO } from 'lib/icos';
import icoData from 'lib/ico-data';
import { fetchETHPrice, fetchBTCPrice } from 'shared/lib/exchanges/gdax';
import { cache } from 'app';
import Ticker from '~/models/ticker';
import PriceHistory from 'models/price-history';
import * as shapeshift from 'shared/lib/shapeshift';

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;

export default async function icos() {
  const startAll = Date.now();
  const priceHistories = await PriceHistory.find().lean().exec();
  const endPriceHistories = Date.now();
  const msPriceHistories = endPriceHistories - startAll;
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

  winston.info(`Querying mongo for PriceHistory for icos resolver took ${msPriceHistories}ms`);

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
    } catch (err) {
      winston.error('Failed to fetch shapeshift coins: %s', err.message);
    }
    cache.set('shapeshiftCoins', shapeshiftCoins, ONE_DAY);
  }

  // Get the current ETH price
  let ethPrice = cache.get('ethPrice');
  let btcPrice = cache.get('btcPrice');

  if (!ethPrice) {
    const start = Date.now();

    winston.warn('ETH price not in cache - refetching');
    try {
      ethPrice = await fetchETHPrice();
      const end = Date.now();
      const ms = end - start;

      winston.info(`Fetched ETH price in ${ms}ms`);
    } catch (e) {
      try {
        const ticker = await Ticker.findOne({ ticker: 'ethereum' }).exec();

        ethPrice = ticker.price_usd;
        winston.info('Fetched fallback ETH price (%s) from db.', ethPrice);
      } catch (err) {
        winston.error('Failed to fetch ETH price in ICO resolver.');
      }
    }
    cache.set('ethPrice', ethPrice, ONE_HOUR);
  }

  if (!btcPrice) {
    const start = Date.now();

    winston.warn('BTC price not in cache - refetching');
    try {
      btcPrice = await fetchBTCPrice();
      const end = Date.now();
      const ms = end - start;

      winston.info(`Fetched BTC price in ${ms}ms`);
    } catch (e) {
      try {
        const ticker = await Ticker.findOne({ ticker: 'bitcoin' }).exec();

        btcPrice = ticker.price_usd;
        winston.info('Fetched fallback BTC price (%s) from db.', btcPrice);
      } catch (err) {
        winston.error('Failed to fetch BTC price in ICO resolver.');
      }
    }
    cache.set('btcPrice', btcPrice, ONE_HOUR);
  }

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
