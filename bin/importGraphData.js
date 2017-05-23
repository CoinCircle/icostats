/* eslint-disable */
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fetch = require('isomorphic-fetch');
const settings = require('../settings.js');
const icoData = require('../src/server/lib/ico-data.js');

mongoose.Promise = Promise;
mongoose.connect(settings.MONGO_URI);

const Price = require('../src/server/models/price.js');

const tickers = [
  ...(icoData.map(ico => ico.ticker)),
  'bitcoin',
  'ethereum'
];

console.log('Fetching %s graphs...', tickers.length);

recursiveFetch(tickers, 0).then(() => console.log('done'))

function recursiveFetch(tickers, i) {
  const ticker = tickers[i];
  const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`;

  console.log('Fetching graph for %s', ticker);

  return fetch(url).then(res => res.json()).then((json) => {
    const query = {
      ticker
    };
    const doc = {
      price_usd: json.price_usd
    };
    const options = {
      upsert: true
    };
    return Price.findOneAndUpdate(query, doc, options).then((err) => {
      if (i === tickers.length - 1) {
        console.log('Finished fetching all graphs');
      } else {
        console.log('Fetched graph for %s', ticker);
        return recursiveFetch(tickers, i + 1);
      }
    })
  });
}
