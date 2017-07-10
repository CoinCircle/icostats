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
 * @flow
 */
import winston from 'winston';
import Promise from 'bluebird';
import { fetchETHPrice, fetchBTCPrice } from './exchanges/gdax';
import coinmarketcap from './coinmarketcap';
import {
  bittrex,
  cryptopia,
  cryptowatch,
  etherdelta,
  hitbtc,
  liqui,
  poloniex
} from './exchanges';


type $Exchange =
  | bittrex
  | cryptopia
  | cryptowatch
  | etherdelta
  | hitbtc
  | liqui
  | poloniex;

type $ExchangeTypes =
  | 'BITTREX'
  | 'CRYPTOPIA'
  | 'CRYPTOWATCH'
  | 'ETHERDELTA'
  | 'HITBTC'
  | 'LIQUI'
  | 'POLONIEX';

type $BoundPriceMap = {
  [exchangeId: string]: {
    [pair: string]: Promise<number>
  }
}

// So we can make this a singleton, we save instance here.
let instance;

export const EXCHANGES = {
  BITTREX: bittrex,
  CRYPTOPIA: cryptopia,
  CRYPTOWATCH: cryptowatch,
  ETHERDELTA: etherdelta,
  HITBTC: hitbtc,
  LIQUI: liqui,
  POLONIEX: poloniex
};

// Some error types
class UnsupportedPairError extends Error {}

class ExchangeService {
  exchange: $Exchange;
  boundPriceMapByExchange: $BoundPriceMap;

  constructor() {
    this.exchange = EXCHANGES.POLONIEX;
  }

  /**
   * Set the default exchange.
   */
  setExchange(which: $ExchangeTypes) {
    const isValid = Object.prototype.hasOwnProperty.call(EXCHANGES, which);

    if (!isValid) {
      throw new Error(`${which} is not a valid exchange.`);
    }

    this.exchange = EXCHANGES[which];
  }

  /**
   * Given a pair + exchange, returns the pair formatted the way the exchange
   * expects it.
   *
   * If you want price of TKN in BTC, a = TKN and b = BTC
   * @param {String} a Symbol of asset you want the price of
   * @param {String} b The base currency (you want the price in this currency).
   */
  generatePair(_a: string, _b: string, exchange: $ExchangeTypes): string {
    const a = _a.toLowerCase();
    const b = _b.toLowerCase();
    const A = _a.toUpperCase();
    const B = _b.toUpperCase();

    switch (exchange) {
      case 'BITTREX':
        return `${B}-${A}`;
      case 'CRYPTOPIA':
        return `${A}_${B}`;
      case 'CRYPTOWATCH':
        return `${a}${b}`;
      case 'ETHERDELTA':
        return `${A}-${B}`;
      case 'HITBTC':
        return `${A}${B}`;
      case 'LIQUI':
        return `${a}_${b}`;
      case 'POLONIEX':
        return `${B}_${A}`;
      default:
        return `${A}${B}`;
    }
  }

  /**
   * Returns an object like this:
   * pairMap - {
   *  EXCHANGE: {
   *    pair: () => Promise,
   *    ...
   *  },
   *  ...
   * }
   *
   * where the EXCHANGE key is the exchange ID, and the 'pair' key is the pair.
   * Its value is a function, which when called, fetches the real time price.
   *
   * Example usage: pairMap.LIQUI.tkn_btc().then(price => console.log(price))
   *
   * @return {Promise}
   */
  async fetchBoundPriceMap(): Promise<$BoundPriceMap> {
    if (this.boundPriceMapByExchange) {
      return this.boundPriceMapByExchange;
    }
    const keys = Object.keys(EXCHANGES);
    const promises = keys.map(k => EXCHANGES[k].fetchBoundPriceMap());
    const priceFetchMaps = await Promise.all(promises);
    const boundPriceMapByExchange = priceFetchMaps
      .reduce((obj, fetcher, i) => ({ ...obj, [keys[i]]: fetcher }), {});

    this.boundPriceMapByExchange = boundPriceMapByExchange;

    return this.boundPriceMapByExchange;
  }

  async generatePricemap() {
    if (!this.boundPriceMapByExchange) {
      await this.fetchBoundPriceMap();
    }

    return this.boundPriceMapByExchange;
  }


  /**
   * Given a pair, finds the exchange that lists it, and returns a promise,
   * which when executed, will resolve with the real-time price.
   */
  getPriceFetcherForPair(a: string, b: string) {
    if (!this.boundPriceMapByExchange) {
      throw new Error('No price map yet! Call exchangeService.generatePricemap first.');
    }
    const exchangeKeys = Object.keys(EXCHANGES);
    const pricesByExchange = this.boundPriceMapByExchange;

    for (let i = 0; i < exchangeKeys.length; i++) {
      const key = exchangeKeys[i];
      const priceMap = pricesByExchange[key];
      const pair = this.generatePair(a, b, key);
      const hasPair = Object.prototype.hasOwnProperty.call(priceMap, pair);

      if (hasPair) {
        return priceMap[pair];
      }
    }

    throw new UnsupportedPairError('Pair not found on any exchange');
  }

  async fetchPrice(a: string, b: string) {
    if (!this.boundPriceMapByExchange) {
      await this.fetchBoundPriceMap();
    }
    const priceFetcher = this.getPriceFetcherForPair(a, b);
    const price = await priceFetcher();

    return price;
  }

  async fetchUSDPrice(symbol: string) {

    // Try coinmarketcap first.
    try {
      const map = await coinmarketcap.fetchBoundPriceMap();
      const fetcher = map[`${symbol}-USD`];
      const price = await fetcher();

      return price;
    } catch (err) { winston.warn(err.message); }

    // Try direct to USD
    try {
      const price = await this.fetchPrice(symbol, 'USD');

      return price;
    } catch (e) { winston.warn(e.message); }

    // Nope, go through BTC
    try {
      const price = await this.fetchPrice(symbol, 'BTC');
      const btcPrice = await fetchBTCPrice();

      return price * btcPrice;
    } catch (e) { winston.warn(e.message); }

    // Nope, try ETH
    try {
      const price = await this.fetchPrice(symbol, 'ETH');
      const ethPrice = await fetchETHPrice();

      return price * ethPrice;
    } catch (e) {
      winston.warn(
        `ExchangeService: No integrated exchanges support ${symbol}. Consider
        integrating an exchange that does.`
      );
    }

    winston.error(`ExchangeService: Failed to find ${symbol} on any exchange!`);
    return null;
  }
}


export default function exchangeService() {
  if (instance) {
    return instance;
  }

  instance = new ExchangeService();

  return instance;
}
