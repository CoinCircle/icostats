/* eslint-disable */
import winston from 'winston';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import settings from 'settings';
import icoData from '~/lib/ico-data.js';
import Price from '~/models/price.js';
import checkStatus from 'shared/lib/fetch-check-status.js';

let interval;

// For intervals
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

// Get our tickers, and add ETH/BTC
const tokens = [
  ...icoData.filter(ico => !!ico.ticker).map(({ ticker, symbol }) => ({ ticker, symbol })),
  { ticker: 'ethereum', symbol: 'ETH' },
  { ticker: 'bitcoin', symbol: 'BTC' }
];

// Initialize!
export default function initGraphWorker() {
  if (!interval) {
    winston.info('Initializing graph worker...');
    recursiveFetch(tokens, 0);
    interval = setInterval(() => recursiveFetch(tokens, 0), ONE_HOUR);
  }
}

/**
 * Fetches a graph, saves it, and does it again if the counter is less than the
 * tickers length.
 * @param {Array<String>} tickers - Coinmarketcap-compatible tickers.
 * @param {Number} i - counter
 * @return {Promise}
 */
function recursiveFetch(tokens, i) {
  const { ticker, symbol } = tokens[i];
  const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`;

  winston.info(`Fetching graph for ${ticker}`);

  return fetch(url)
   .then(checkStatus)
   .then(res => res.json())
   .then(json => saveData(json, ticker, symbol, i))
   .catch(err =>
     winston.error(`Failed to fetch graph for ${ticker}: ${err.message}`)
   );
}

/**
 * Save graph data to db.
 */
function saveData(json, ticker, symbol, i) {
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
   .then(() => recurseOrFinish(ticker, i))
   .catch(winston.error);
}

/**
 * Recurse or exit if we fetched graphs for all ICOs.
 * @param {Object} err
 * @param {String} ticker
 * @param {Number} i
 * @return {Promise | void}
 */
function recurseOrFinish(ticker, i) {
  // If we are at the last one, kill recursion.
  if (i === tokens.length - 1) {
    winston.info('Finished fetching all graphs');
    return;
  } else {

    // Keep recursing.
    winston.info(`Fetched graph for ${ticker}`);
    return recursiveFetch(tokens, i + 1);
  }
}
