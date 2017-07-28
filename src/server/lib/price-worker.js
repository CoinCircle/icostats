/**
 * Fetches prices to build historical price graph data.
 * @flow
 */
 /* eslint-disable camelcase */
import winston from 'winston';
import pubsub from '~/lib/pubsub';
import * as topics from '~/lib/pubsub.topics';
import icoData from '~/lib/ico-data';
import getExchangeService from 'shared/lib/exchange.service';
import PriceHistory from '~/models/price-history';

const ONE_SECOND = 1000;
const FIVE_SECONDS = ONE_SECOND * 5;

// Delay between fetching each price.
const DELAY = FIVE_SECONDS;

let ref;
const exchangeService = getExchangeService();

export default function initTickerWorker() {
  const symbols = [
    ...icoData.map(ico => ico.symbol),
    'ETH',
    'BTC'
  ];

  if (!ref) {
    ref = recursiveFetchPrice(symbols, 0);
  }
}

async function recursiveFetchPrice(symbols, index) {
  const symbol = symbols[index];
  const ts = Date.now();

  try {
    const price = await exchangeService.fetchUSDPrice(symbol);
    const time = Date.now() - ts;

    winston.info(`Price Worker: Fetched price for ${symbol} in ${time}ms`);

    if (typeof price !== 'number' || isNaN(price)) {
      throw new Error(`Got an invalid price for ${symbol}`);
    } else {
      await savePrice(price, symbol, ts);
    }
  } catch (err) {
    winston.error(
      `Price worker failed to fetch price for ${symbol}: ${err.message}`
    );
  }
  const nextIndex = (index === symbols.length - 1) ? 0 : (index + 1);

  setTimeout(() => recursiveFetchPrice(symbols, nextIndex), DELAY);
}

async function savePrice(price, symbol, ts) {
  const data = { price_usd: price, timestamp: ts };
  let model = await PriceHistory.findOne({ symbol });

  //  If its the first time we are dealing with this token, we need to create
  //  a document for it.
  if (!model) {
    model = new PriceHistory({ symbol });
  }

  //  Add to the history
  model.prices.push(data);

  // Check if the price changed (if so, we'll publish that fact later.)
  const didPriceChange = price !== model.latest.price_usd;

  // Cache this in 'latest' so we dont need to iterate the whole history to
  // find the latest price.
  model.set('latest', data);

  try {
    await model.save();
  } catch (e) {
    winston.error(
      `Failed to save price for ${symbol}: returned price was ${price}, and
       error message: ${e.message}`
    );
  }

  if (didPriceChange) {
    const payload = {
      icoPriceChanged: { symbol, price }
    };

    pubsub.publish(topics.ICO_PRICE_CHANGED, payload);
  }
}
