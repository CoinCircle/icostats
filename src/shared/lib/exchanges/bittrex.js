import fetch from 'isomorphic-fetch';

const baseUrl = 'https://bittrex.com/api/v1.1/public';

export async function fetchTicker(pair, raw = false) {
  const url = `${baseUrl}/getticker?market=${pair}`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.result.Last;
}

export async function fetchPairs(raw = false) {
  const url = `${baseUrl}/getmarkets`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.result.map(el => el.MarketName);
}

export async function fetchBoundPriceMap() {
  const url = `${baseUrl}/getmarkets`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = json.result.map(el => el.MarketName);
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
