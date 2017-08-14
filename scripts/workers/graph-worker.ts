/* eslint-disable */
import * as winston from 'winston';
import * as mongoose from 'mongoose';
import * as fetch from 'isomorphic-fetch';
import * as moment from 'moment';
import * as settings from 'settings';
import * as icoData from '~/lib/ico-data.js';
import * as Price from '~/models/price.js';
import Ticker, { ValueTypes, ITicker } from '~/models/Ticker';
import * as checkStatus from 'shared/lib/fetch-check-status.js';
import { connectMongoose, collectGarbage } from './utils';

const db = connectMongoose();

// Get our tickers, and add ETH/BTC
const tokens = [
  ...icoData.filter(
    ico => !!ico.ticker
  ).map(
    ({ id, ticker, symbol }) => ({ id, ticker, symbol })
  ),
  { id: 'ethereum', ticker: 'ethereum', symbol: 'ETH' },
  { id: 'bitcoin', ticker: 'bitcoin', symbol: 'BTC' }
];

export default async function runGraphWorker() {

  try {
    await Promise.map(tokens, fetchTokenGraph, { concurrency: 1 });
  } catch (e) {
    winston.error(`[graph-worker] ERROR: ${e.message}`);
  }

  collectGarbage(db);

  winston.info(`Finished running graph worker`);

  return true;
}


/**
 * Fetches a graph, saves it, and does it again if the counter is less than the
 * tickers length.
 * @param {Array<String>} tickers - Coinmarketcap-compatible tickers.
 * @param {Number} i - counter
 * @return {Promise}
 */
async function fetchTokenGraph(token) {
  const { id, ticker, symbol } = token;
  const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`;

  winston.info(`Fetching graph for ${ticker}`);

  try {
    const res = await fetch(url);
    const json = await res.json();

    await saveData(json, token);
    await saveToTickers(json, token);
  } catch (err) {
    winston.error(`Failed to fetch graph for ${ticker}: ${err.message}`);
  }
}

/**
 * Save graph data to db.
 */
function saveData(json, token) {
  const { ticker, symbol } = token;
  const query = {
    ticker
  };
  const doc = {
    symbol,
    price_usd: json.price_usd
  };
  const options = {
    upsert: true
  };

  return Price
   .findOneAndUpdate(query, doc, options).exec()
   .catch(e => winston.error(e.message));
}

async function saveToTickers(json, token) {
  const { id } = token;
  const { price_usd } = json;

  try {
    const missingPrices = await filterMissingPrices(price_usd, id);
    let counter = 1;
    winston.info(
      `Fetching ${missingPrices.length} prices (filtered) of a total of ${price_usd.length}`
    );

    await Promise.map(missingPrices, ([ts, price]) => {
      const tsMoment = moment(ts);
      const timestamp_hour = tsMoment.startOf('hour').valueOf();
      const minute = tsMoment.minute();
      const second = tsMoment.second();

      winston.info(
        `graph-worker: (${id}) Fetching price ${counter} of${missingPrices.length}`
      );

      counter++;

      return Ticker.findOne({
        timestamp_hour,
        belongs_to: id
      }).exec().then(ticker => {
        if (!ticker) {
          ticker = new Ticker({
            timestamp_hour,
            belongs_to: id,
            type: ValueTypes.PriceUSD
          });
        }
        ticker.values[minute][second] = price;
        ticker.markModified(`values.${minute}.${second}`);

        return ticker.save();
      }).catch(err => winston.error(`[graph-worker] error: ${err.message}`));
    }, { concurrency: 10 });
  } catch (err) {
    winston.error(`[graph-worker] (saveToTickers) ERROR: ${err.message}`);
  }
}

type CMCPrice = [number, number];
async function filterMissingPrices(
  prices: CMCPrice[],
  tokenId: string
): Promise<CMCPrice[]> {
  const query = { belongs_to: tokenId, type: ValueTypes.PriceUSD };
  const docs = await Ticker.find(query).lean().exec();
  const tickers = <ITicker[]>docs;
  const filter = ([ts, price]) => {
    const tsMoment = moment(ts);
    const timestamp_hour = tsMoment.clone().startOf('hour').valueOf();
    const minute = tsMoment.minute();
    const second = tsMoment.second();
    const ticker = tickers.find(
      t => t.timestamp_hour.valueOf() === timestamp_hour
    );

    if (!ticker) {
      return true;
    }

    if (!ticker.values[minute][second]) {
      return true
    }

    return false;
  }

  winston.info(`Filtering out redundant prices for ${tokenId}`);

  const filtered = prices.filter(filter);

  const limited = filtered.sort((a, b) => b[0] - a[0]).slice(0, 30);

  winston.info(`
    [graph-worker] ${filtered.length} prices limited to ${limited.length}
  `);

  return limited;
}
