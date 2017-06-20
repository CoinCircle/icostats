import fetch from 'isomorphic-fetch';

const baseUrl = 'http://api.hitbtc.com/api/1/public';

export async function fetchTicker(pair, raw = false) {
  const url = `${baseUrl}/${pair}/ticker`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json;
  }

  return parseFloat(json.last);
}

export async function fetchPairs() {
  const url = `${baseUrl}/symbols`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function fetchBoundPriceMap() {
  const url = `${baseUrl}/symbols`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = json.symbols.map(s => s.symbol);
  const priceMap = {};

  pairs.forEach((pair) => {
    priceMap[pair] = fetchTicker.bind(null, pair);
  });

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
