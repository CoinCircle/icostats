import fetch from 'isomorphic-fetch';

const baseUrl = 'https://api.cryptowat.ch';

class TooManyRequestsError extends Error {}

export async function fetchTicker(pair, exchange = 'coinbase', raw = false) {
  const url = `${baseUrl}/markets/${exchange}/${pair}/summary`;
  const res = await fetch(url);
  const json = await res.json();

  if (json.error === 'Out of allowance') {
    throw new TooManyRequestsError();
  }

  if (raw) {
    return json.result;
  }

  return json.result.price.last;
}

export async function fetchPairs(raw = false) {
  const url = `${baseUrl}/markets`;
  const res = await fetch(url);
  const json = await res.json();

  if (json.error === 'Out of allowance') {
    throw new TooManyRequestsError();
  }

  if (raw) {
    return json.result;
  }

  const priceMap = {};

  json.result.forEach((data) => {
    const { exchange, currencyPair } = data;

    if (!priceMap[currencyPair]) {
      priceMap[currencyPair] = fetchTicker.bind(currencyPair, '', exchange);
    }
  });

  return priceMap;
}

export async function fetchBoundPriceMap() {
  const url = `${baseUrl}/markets`;
  const res = await fetch(url);
  const json = await res.json();
  const priceMap = {};

  if (json.error === 'Out of allowance') {
    throw new TooManyRequestsError();
  }

  json.result.forEach((data) => {
    const { exchange, currencyPair } = data;

    if (!priceMap[currencyPair]) {
      priceMap[currencyPair] = fetchTicker.bind(null, currencyPair, exchange);
    }
  });

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchBoundPriceMap
};
