/* eslint-disable */
const winston = require('winston');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fetch = require('isomorphic-fetch');
const settings = require('../settings.js');
const icoData = require('../src/server/lib/ico-data.js');
const Price = require('../src/server/models/price.js');

// Connect to db.
mongoose.Promise = Promise;
mongoose.connect(settings.MONGO_URI);

// Enable logging
require('winston-loggly-bulk');
winston.add(winston.transports.Loggly, {
  inputToken: settings.LOGGLY_TOKEN,
  subdomain: settings.LOGGLY_SUBDOMAIN,
  tags: ['Winston-NodeJS', settings.LOGGLY_TAG],
  json: true
});

// Get our tickers, and add ETH/BTC
const tickers = [
  ...(icoData.map(ico => ico.ticker)),
  'bitcoin',
  'ethereum'
];

// Initialize!
winston.info('Fetching %s graphs...', tickers.length);
recursiveFetch(tickers, 0).then(() => console.log('done'));

/**
 * Fetches a graph, saves it, and does it again if the counter is less than the
 * tickers length.
 * @param {Array<String>} tickers - Coinmarketcap-compatible tickers.
 * @param {Number} i - counter
 * @return {Promise}
 */
function recursiveFetch(tickers, i) {
  const ticker = tickers[i];
  const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`;

  winston.info('Fetching graph for %s', ticker);

  return fetch(url)
   .then(res => res.json())
   .then(json => saveData(json, ticker, i))
   .catch(err =>
     winston.error('Failed to fetch graph for %s: %s', ticker, err.message)
   );
}

/**
 * Save graph data to db.
 */
function saveData(json, ticker, i) {
  const query = {
    ticker
  };
  const doc = {
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
  if (i === tickers.length - 1) {
    console.log('Finished fetching all graphs');
    process.exit(0);
  } else {

    // Keep recursing.
    console.log('Fetched graph for %s', ticker);
    return recursiveFetch(tickers, i + 1);
  }
}
