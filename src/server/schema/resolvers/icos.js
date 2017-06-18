/* eslint-disable no-console */
import winston from 'winston';
import { normalize as normalizeICO } from 'lib/icos';
import icoData from 'lib/ico-data';
import { fetchETHPrice, fetchBTCPrice } from 'shared/lib/exchanges/gdax';
import { cache } from 'app';
import Ticker from 'models/ticker';

export default async function icos() {
  const tickers = await Ticker.find();
  const results = icoData.map(data => ({
    ...data,
    ...( tickers.find(t => t.ticker === data.ticker)._doc ),
    id: data.id
  }));

  // Get the current ETH price
  let ethPrice = cache.get('ethPrice');
  let btcPrice = cache.get('btcPrice');

  if (!ethPrice) {
    try {
      ethPrice = await fetchETHPrice();
    } catch (e) {
      const ticker = tickers.find(t => t.symbol === 'ETH');

      ethPrice = ticker.price_usd;
      winston.info('Fetched fallback ETH price (%s) from db.', ethPrice);
    }
    cache.set('ethPrice', ethPrice);
  }

  if (!btcPrice) {
    try {
      btcPrice = await fetchBTCPrice();
    } catch (e) {
      const ticker = tickers.find(t => t.symbol === 'BTC');

      btcPrice = ticker.price_usd;
      winston.info('Fetched fallback BTC price (%s) from db.', btcPrice);
    }
    cache.set('btcPrice', btcPrice);
  }

  return results.map(ico => normalizeICO(ico, ethPrice, btcPrice));
}
