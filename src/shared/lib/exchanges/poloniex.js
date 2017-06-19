/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const baseUrl = 'https://poloniex.com/public';

export async function fetchTicker(a, b, raw = false) {
  const pair = `${a.toUpperCase()}_${b.toUpperCase()}`;
  const url = `${baseUrl}?command=returnTicker`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json;
  }

  return parseFloat(json[pair].last);
}

export async function fetchPairs() {
  const url = `${baseUrl}?command=returnTicker`;
  const res = await fetch(url);
  const json = await res.json();

  return Object.keys(json);
}

export async function fetchBoundPriceMap() {
  const url = `${baseUrl}?command=returnTicker`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = Object.keys(json);
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
