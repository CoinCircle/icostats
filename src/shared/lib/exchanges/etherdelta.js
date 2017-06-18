// @flow
import fetch from 'isomorphic-fetch';
import winston from 'winston';
import etherdeltaConfig from 'shared/lib/etherdelta.config.js';

const baseUrl = 'https://api.etherdelta.com';

/**
 * NOTE You can't pass symbols, only ERC-20 contract addresses!
 */
export async function fetchTicker(a: string, b: string, raw: boolean = false) {
  const url = `${baseUrl}/orders/${a}/${b}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (raw) {
      return json;
    }

    // Only order lists are exposed, so we must search for the lowest ask.
    const sellOrders = json.orders.filter(o => o.amount < 0);
    const sorted = sellOrders.map(o => parseFloat(o.price)).sort();
    const lowestAsk = sorted[0];

    return lowestAsk;
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


function getPairsForToken(token, tokens): string[] {
  const others = tokens.filter(t => t.name !== token.name);

  return others.map(other => `${token.name}-${other.name}`);
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
