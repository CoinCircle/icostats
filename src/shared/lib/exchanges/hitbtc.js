import fetch from 'isomorphic-fetch';

const baseUrl = 'http://api.hitbtc.com/api/1/public';

export async function fetchTicker(a, b, raw = false) {
  const symbol = `${a.toUpperCase()}${b.toUpperCase()}`;
  const url = `${baseUrl}/${symbol}/ticker`;
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

export async function fetchPrices() {
  const url = `${baseUrl}/symbols`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = json.symbols.map(s => s.symbol);
  const priceMap = {};

  pairs.forEach((pair) => {
    priceMap[pair] = fetchTicker.bind(null, pair, '');
  });

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchPrices
};
