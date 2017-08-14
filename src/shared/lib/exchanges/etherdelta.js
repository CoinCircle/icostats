// @flow
import fetch from 'isomorphic-fetch';
import winston from 'winston';
import BigNumber from 'bignumber.js';
import etherdeltaConfig from 'shared/lib/etherdelta.config.js';

const baseUrl = 'https://cache1.etherdelta.com';

/**
 * NOTE You can't pass symbols, only ERC-20 contract addresses!
 */
export async function fetchTicker(a: string, b: string = '', raw: boolean = false) {
  const nonce = getNonce();
  const url = `${baseUrl}/orders/${nonce}/${a}/${b}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (raw) {
      return json;
    }

    // Only order lists are exposed, so we must search for the lowest ask.
    const sellOrders = json.orders.filter(
      o => /sell$/.test(o.id)
    );
    const sorted = sellOrders.sort((a, b) =>
      new BigNumber(a.price).lessThan(new BigNumber(b.price)) ? -1 : 1
    );
    const lowestAsk = sorted[0].price;
    const addr = sorted[0].order.tokenGet;
    const bignum = getNumber(lowestAsk, addr);

    return parseFloat(bignum);
  } catch (err) {
    winston.error(err.message);
  }

  return null;
}


export async function fetchPairs() {
  const { tokens } = etherdeltaConfig;
  const pairs = tokens.reduce((acc, token) => [
    ...acc, ...getPairsForToken(token, tokens)
  ]);

  return new Promise(resolve => resolve(pairs));
}

export async function fetchBoundPriceMap() {
  const { tokens } = etherdeltaConfig;
  const pairs = await fetchPairs();

  // Some symbols has a '-' in it. Don't use those.
  const filtered = pairs.filter(p => p.match(/-/g).length === 1);
  const priceMap = {};

  filtered.forEach((pair) => {
    const [a, b] = pair.split('-');
    const tokenA = tokens.find(t => t.name === a);
    const tokenB = tokens.find(t => t.name === b);

    priceMap[pair] = fetchTicker.bind(null, tokenA.addr, tokenB.addr);
  });


  return priceMap;
}

function getNumber(strNum: string, addr: string) {
  const obj = etherdeltaConfig.tokens.find(t => t.addr === addr);
  const decimals = obj.decimals;

  return new BigNumber(strNum).toFixed(decimals);
}


function getPairsForToken(token, tokens): string[] {
  const others = tokens.filter(t => t.name !== token.name);

  return others.map(other => `${token.name}-${other.name}`);
}

function getNonce() {
  return Math.random().toString().slice(2) + Math.random().toString().slice(2);
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
