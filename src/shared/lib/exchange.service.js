/**
 * Implements the following queries across all exchanges:
 * - Fetch a list of pairs supported by the exchange.
 * - Fetch ticker of a pair
 *
 * Normalized rules:
 * * Pairs are uppercased and hyphen-separated (BTC-ETH)
 * * tickers return keys:
 *  - last: Last trade price
 *  - volume: 24 hr volume
 */
import Promise from 'bluebird';
import {
  bittrex,
  cryptowatch,
  hitbtc,
  liqui,
  poloniex
} from './exchanges';

let instance;

export const EXCHANGES = {
  BITTREX: bittrex,
  CRYPTOWATCH: cryptowatch,
  HITBTC: hitbtc,
  LIQUI: liqui,
  POLONIEX: poloniex
};

class ExchangeService {
  constructor() {
    this.exchange = EXCHANGES.POLONIEX;
    this.priceMap = null;
    this.priceMapTime = null;
  }

  setExchange(which) {
    const isValid = Object.prototype.hasOwnProperty.call(EXCHANGES, which);

    if (!isValid) {
      throw new Error(`${which} is not a valid exchange.`);
    }

    this.exchange = EXCHANGES[which];
  }

  async fetchPrices() {
    if (this.priceMap) {
      return this.priceMap;
    }
    const promises = Object.values(EXCHANGES).map(exch => exch.fetchPrices());
    const results = await Promise.all(promises);
    const priceMap = results.reduce((p, c) => ({ ...p, ...c }), {});

    this.priceMap = priceMap;

    return this.priceMap;
  }

  async fetchPrice(_a, _b) {
    if (!this.priceMap) {
      await this.fetchPrices();
    }
    const a = _a.toLowerCase();
    const b = _b.toLowerCase();
    const A = _a.toUpperCase();
    const B = _b.toUpperCase();
    const matchable = [
      `${A}_${B}`,
      `${a}_${b}`,
      `${A}-${B}`,
      `${a}-${b}`,
      `${A}${B}`,
      `${a}${b}`
    ];
    const prices = Object.entries(this.priceMap);
    let fetcher;

    for (let i = 0; i < prices.length; i = i + 1) {
      const [key, value] = prices[i];

      if (matchable.indexOf(key) > -1) {
        fetcher = value;
        break;
      }
    }

    if (!fetcher) {
      throw new Error('Pair not found on any exchange.');
    }

    const price = await fetcher();

    return price;
  }

  async fetchUSDPrice(symbol) {
    // Try direct to USD
    try {
      const price = await this.fetchPrice(symbol, 'USD');

      return price;
    } catch (e1) {
      // Nope, go through BTC
      try {
        const price = await this.fetchPrice(symbol, 'BTC');
        const btcPrice = await this.fetchPrice('BTC', 'USD');

        return price * btcPrice;
      } catch (e2) {
        // Nope, try ETH
        try {
          const price = await this.fetchPrice(symbol, 'ETH');
          const ethPrice = await this.fetchPrice('ETH', 'USD');

          return price * ethPrice;
        } catch (e3) {
          return null;
        }
      }
    }
  }
}


export default function exchangeService() {
  if (instance) {
    return instance;
  }

  instance = new ExchangeService();

  return instance;
}
