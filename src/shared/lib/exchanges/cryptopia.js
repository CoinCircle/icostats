import fetch from 'isomorphic-fetch';

const baseUrl = 'https://www.cryptopia.co.nz/api';

export async function fetchTicker(a, b, raw = false) {
  const pair = `${a.toUpperCase()}_${b.toUpperCase()}`;
  const url = `${baseUrl}/GetMarket/${pair}`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.Data.LastPrice;
}

export async function fetchPairs(raw = false) {
  const url = `${baseUrl}/GetTradePairs`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.Data.map(el => el.Label.replace('/', '_'));
}

export async function fetchBoundPriceMap() {
  const pairs = await fetchPairs();
  const priceMap = {};

  pairs.forEach((pair) => {
    const [a, b] = pair.split('_');

    priceMap[pair] = fetchTicker.bind(null, a, b);
  });

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
