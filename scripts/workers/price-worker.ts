/* eslint-disable camelcase */
/**
 * Fetches prices to build historical price graph data.
 *
 * The goal of this worker is to eventually fill the database with thorough
 * historical price data for any token that exists or that gets added in the
 * future.
 *
 * The worker should prioritize current price data over past data, but not
 * always. For example, if we have at least one price on 08/02/17, but no
 * price data for 08/02/17 (the previous day), we should prefer to get
 * the price for 08/02/17. The reason for this is because we want to have at
 * least one price point for each day so that there are no gaps in our price
 * graphs. Once we have at least one price for each day since the token's ICO,
 * then we should move on to more granular data (e.g. hours).
 *
 * Therefore, the priority is as follows (in descending order):
 * - Current daily data
 * - past daily data
 * - current hourly data
 * - past hourly data
 * - ...(minutes, seconds)
 *
 * TODO The exchange service needs to be updated to support a timestamp argument
 * to make this work.
 */
import * as winston from 'winston';
import getExchangeService from 'shared/lib/exchange.service';
import Ticker, { ValueTypes } from '~/models/Ticker';
import * as Token from 'server/models/Token';
import * as moment from 'moment';
import * as settings from 'settings';
import { connectMongoose, collectGarbage } from './utils';

const db = connectMongoose();
const handleError = err => winston.error(
  `Error in price-worker: ${err.message}`
);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const exchangeService = getExchangeService();

interface Target {
  id: string;
  symbol: string;
}

export default async function runPriceWorker() {
  const icos = await Token.find().lean().exec();
  const targets: Target[] = [
    {
      id: 'bitcoin',
      symbol: 'BTC'
    },
    ...icos.map(ico => ({ id: ico.id, symbol: ico.symbol }))
  ];
  const promise = targets.reduce((promise, target) =>
    promise.then(() => fetchPrice(target)).catch(handleError)
  , Promise.resolve());

  return promise.then(() => collectGarbage(db));
}

async function fetchPrice(target: Target) {
  const ts = Date.now();

  try {
    const price = await exchangeService.fetchUSDPrice(target.symbol);
    const time = Date.now() - ts;

    winston.info(`Price Worker: Fetched price for ${target.id} in ${time}ms`);

    if (typeof price !== 'number' || isNaN(price)) {
      throw new Error(`Got an invalid price for ${target.id}`);
    } else {
      await savePrice(price, target, ts);
    }

    await wait(10000);
  } catch (err) {
    winston.error(
      `Price worker failed to fetch price for ${target.id}: ${err.message}`
    );
  }
}

async function savePrice(price, target, ts) {
  const tsMoment = moment(ts);
  const timestamp_hour = tsMoment.clone().startOf('hour').valueOf();
  const type = ValueTypes.PriceUSD;
  let model = await Ticker.findOne({
    belongs_to: target.id,
    timestamp_hour,
    type
  });

  //  If its the first time we are dealing with this token, we need to create
  //  a document for it.
  if (!model) {
    model = new Ticker({ belongs_to: target.id, timestamp_hour, type });
  }

  const minute = tsMoment.minute();
  //  Add to the history
  model.values[minute] = price;

  model.markModified(`values.${minute}`);

  try {
    await model.save();
  } catch (e) {
    winston.error(
      `Failed to save price for ${target.id}: returned price was ${price}, and
       error message: ${e.message}`
    );
  }
}
