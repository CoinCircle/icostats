/**
 * In the app we show recent prices as well as charts. The amount of data stored
 * in the databse is very large, so we want to summarize that data to get just
 * the minimum datapoints required to show the graph. This module implements
 * the following:
 *
 *  1. Function to get a summarized history which lets pass some period (for
 *     example, 1 day), and will return the price history that contains just
 *     one price per day. So if we have 30 days of data, we should receive an
 *     array of 30 prices.
 *
 *  2. A function which can take this data and then serialize it in a format
 *     that can be stored in a cache such as redis.
 *
 *  3. A function that lets us read this same data from redis.
 *
 *  4. A function that tries to read from redis, and in the case where that
 *     data is not available in the cache, falls back to the cache. The app
 *     will use this function, but our goal is to architect our app in such
 *     a way that this function never has to fall back to mongo.
 */
import * as moment from 'moment';
import * as winston from 'winston';
import range = require('lodash/range');
import Ticker, { ITicker } from '~/models/Ticker';

export interface ILatestTimestamp {
  _id: string;
  latestHour: Date;
}

/**
 * For every token we list, return the latest timestamp for which we have a
 * price in the database. This can be used when querying for the current prices,
 * in order to know which timestamps to query for. Ideally this would return the
 * price as well, but I have not found a way to do it using aggregation and our
 * data structure.
 * @return {Promise<ILatestTimestamp[]>}
 */
export async function getLatestTimestamps(): Promise<ILatestTimestamp[]> {
  const latestAvailable = await Ticker.aggregate().match({
      belongs_to: { $exists: true }
    }).group({
      _id: '$belongs_to',
      latestHour: { $max: '$timestamp_hour' }
    }).exec();

  winston.info(`Finished aggregation of latest timstamp for all tickers`);

  return latestAvailable;
};

export interface ILatestPrice {
  id: string;
  latestPrice: number;
  timestamp: number;
}

/**
 * For every token, returns the current (i.e. most recent) price we have in the
 * db.
 * @return {Promise<ILatestPrice[]>}
 */
export async function getLatestPrices(): Promise<ILatestPrice[]> {
  // Get the most recent timestamp available for every token.
  const items = await getLatestTimestamps();

  // Generate the keys we'll need later for iteration in *reverse* order
  // so we get the latest prices first.
  const timeKeys = range(60).map(String).reverse();

  winston.info(`Updating latest prices...`);

  const res = await Promise.map(items, async item => {
    const query = {
      belongs_to: item._id,
      timestamp_hour: item.latestHour
    };
    const doc = await Ticker.findOne(query).lean().exec();
    let ticker = <ITicker>doc;
    let price;
    let timestamp;
    const tsMoment = moment(item.latestHour);

    winston.info(`(latestPrices): processing ${item._id}`);

    // Iterate through each minute/second (in reverse) until we find a non-zero
    // value, meaning we found a price.
    for (let minute in timeKeys) {
        if (price) break;
        const val = ticker.values[minute];

        if (val) {
          price = val;
          tsMoment.minute(+minute);
          timestamp = tsMoment.valueOf();
        }
    }

    return {
      id: item._id,
      latestPrice: price,
      timestamp
    };
  }, { concurrency: 1 });

  return res;
}

interface RecentPrice {
  day: number;
  week: number;
  month: number;
}
interface RecentPricesById {
  [id: string]: RecentPrice;
}

/**
 * Unlike the getLatestPrices function, this returns prices for all tokens for
 * each of three periods: a day ago, a week ago, and a month ago.
 * @return {Promise<RecentPricesById>}
 */
export async function getRecentPrices(): Promise<RecentPricesById> {
  const { dayAgo, weekAgo, monthAgo } = getRecentTimestamps();
  const day = await getAllTickersNearTimestamp(dayAgo);
  const week = await getAllTickersNearTimestamp(weekAgo);
  const month = await getAllTickersNearTimestamp(monthAgo);

  const pricesById = day.reduce((obj, curr) => ({
    ...obj,
    [curr.id]: {
      day: curr.price
    }
  }), {});

  week.forEach(({ id, price }) => {
    pricesById[id] = pricesById[id] || {};
    pricesById[id].week = price;
  });

  month.forEach(({ id, price }) => {
    pricesById[id] = pricesById[id] || {};
    pricesById[id].month = price;
  });

  return pricesById;
}

/**
 * Given a timestamp, return the ticker with the closest timestamp to the input
 * timestamp for all tokens.
 */
async function getAllTickersNearTimestamp(timestamp: number): Promise<{
  id: string;
  price: number;
}[]> {
  const ONE_HOUR = 1000 * 60 * 60;
  const offset = ONE_HOUR * 12;
  const res = await Ticker.aggregate().allowDiskUse(true)
    // Let's only consider documents with timestamps within a few hours from our
    // target timestamp.
    .match({
      timestamp_hour: {
        $gt: new Date(timestamp - offset),
        $lt: new Date(timestamp + offset)
      }
    })
    // Add a `diff` field which contains the absolute difference between the
    // timestamp and the target timestamp.
    .project({
      belongs_to: 1,
      values: 1,
      diff: {
        $abs: {
          $subtract: ['$timestamp_hour', new Date(timestamp)]
        }
      }
    })
    // Sort by the difference ascending so that the first one is the one we want
    .sort({ diff: 1 })
    .group({
      _id: '$belongs_to',
      values: { $first: '$values' }
    }).exec();

  return res.map(obj => ({
    id: obj._id,
    price: extractFirstPrice(obj.values)
  }));
}

function extractFirstPrice(values): number {
  const keys = range(60).map(String);
  let price;

  for (let minute of keys) {
    if (values[minute] > 0) {
      price = values[minute];
      break;
    }
  }

  return price;
}

interface RecentTimestamps {
  dayAgo: number;
  weekAgo: number;
  monthAgo: number;
}
/**
 * Return timestamps for one day ago, one week ago, and one month ago.
 * @return {RecentTimestamps}
 */
function getRecentTimestamps(): RecentTimestamps {
  const now = moment();
  const dayAgo = now.clone().subtract(1, 'days').startOf('hour').valueOf();
  const weekAgo = now.clone().subtract(1, 'weeks').startOf('hour').valueOf();
  const monthAgo = now.clone().subtract(1, 'months').startOf('hour').valueOf();

  return {
    dayAgo,
    weekAgo,
    monthAgo
  };
}
