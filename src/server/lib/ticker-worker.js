/**
 * This worker periodically fetches the latest price of assets from 3rd party
 * APIs, and saves them to the db.
 */
/* eslint-disable camelcase */
import Ticker from 'models/ticker';
import icoData from 'lib/ico-data';

const FIVE_SECONDS = 5000;
let ref;

export default function initTickerWorker() {
  const tickers = [
    ...icoData.map(ico => ico.ticker),
    'ethereum',
    'bitcoin'
  ];

  if (!ref) {
    saveAllTickers(tickers);
    ref = recursiveSyncTicker(tickers, 0);
  }
}

async function recursiveSyncTicker(tickers, index) {
  const ticker = tickers[index];
  const data = await fetchTicker(ticker);

  await saveTicker(data);
  const nextIndex = (index === tickers.length - 1) ? 0 : (index + 1);

  setTimeout(() => recursiveSyncTicker(tickers, nextIndex), FIVE_SECONDS);
}

async function fetchTicker(ticker) {
  const url = `https://api.coinmarketcap.com/v1/ticker/${ticker}/`;
  const response = await fetch(url);
  const json = await response.json();

  return json[0];
}

async function saveAllTickers(tickers) {
  const promises = tickers.map(ticker => fetchTicker(ticker).then(saveTicker));

  await Promise.all(promises);
}

async function saveTicker(ticker) {
  const MILLI = 1000;
  const { id, last_updated, price_usd, symbol, price_btc } = ticker;
  const query = {
    ticker: id
  };
  const doc = {
    symbol,
    price_btc: +price_btc,
    timestamp: new Date(+last_updated * MILLI),
    price_usd: +price_usd,
    volume_usd_24h: ticker['24h_volume_usd']
  };
  const options = {
    upsert: true
  };

  await Ticker.findOneAndUpdate(query, doc, options);
}
