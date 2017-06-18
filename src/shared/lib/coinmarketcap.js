// @flow
/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const baseUrl = 'https://api.coinmarketcap.com/v1';

// Fetching all coinmarketcap assets is SLOW, so cache here.
let assets;

export async function fetchTicker(
  id: string,
  currency: 'USD' | 'BTC' = 'USD',
  raw: boolean = false
) {
  const url = `${baseUrl}/ticker/${id}`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json;
  }

  if (currency === 'USD') {
    return parseFloat(json[0].price_usd);
  }

  if (currency === 'BTC') {
    return parseFloat(json[0].price_btc);
  }

  return json[0];
}

export async function fetchAssets() {
  if (assets) {
    return assets.map(item => item.id);
  }

  const url = `${baseUrl}/ticker`;
  const res = await fetch(url);
  const json = await res.json();

  assets = json;

  return json.map(item => item.id);
}


export async function fetchBoundPriceMap() {
  if (!assets) {
    await fetchAssets();
  }
  const priceMap = {};

  assets.forEach((asset) => {
    const { symbol, id } = asset;

    priceMap[`${symbol}-USD`] = fetchTicker.bind(null, id, 'USD');
    priceMap[`${symbol}-BTC`] = fetchTicker.bind(null, id, 'BTC');
  });


  return priceMap;
}

export default {
  fetchAssets,
  fetchTicker,
  fetchBoundPriceMap
};
