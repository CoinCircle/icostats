import fetch from 'isomorphic-fetch';

const baseUrl = 'https://api.liqui.io/api/3';

export async function fetchTicker(a, b, raw = false) {
  const pair = `${a}_${b}`;
  const url = `${baseUrl}/ticker/${pair}`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json;
  }

  return json[pair].last;
}

export async function fetchPairs() {
  const url = `${baseUrl}/info`;
  const res = await fetch(url);
  const json = await res.json();

  return json.pairs;
}

export async function fetchBoundPriceMap() {
  const url = `${baseUrl}/info`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = Object.keys(json.pairs);
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
