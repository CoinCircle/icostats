import fetch from 'isomorphic-fetch';
import winston from 'winston';

const baseUrl = 'https://api.liqui.io/api/3';

export async function fetchTicker(pair, raw = false) {
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
  const priceMap = {};

  try {
    const res = await fetch(url);
    const json = await res.json();
    const pairs = Object.keys(json.pairs);

    pairs.forEach((pair) => {
      priceMap[pair] = fetchTicker.bind(null, pair);
    });
  } catch (err) {
    winston.error(`Failed to fetch from liqui APIL ${err.message}`);
  }

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
