// @flow
/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const baseUrl = 'https://api.coinmarketcap.com/v1';

// Fetching all coinmarketcap assets is SLOW, so cache here.
let cachedAssets;

export async function fetchTicker(
  id: string,
  currency: 'USD' | 'BTC' = 'USD',
  raw: boolean = false
) {
  const url = `${baseUrl}/ticker/${id}`;

  try {
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
  } catch (e) {
    throw Error(e.message);
  }
}

export async function fetchAssets() {
  if (cachedAssets) {
    return cachedAssets.map(item => item.id);
  }

  try {
    const url = `${baseUrl}/ticker`;
    const res = await fetch(url);
    const json = await res.json();

    cachedAssets = dedupe(json);

    return cachedAssets.map(item => item.id);
  } catch (e) {
    throw new Error('Failed to fetch assets from coinmarketcap API');
  }
}


export async function fetchBoundPriceMap() {
  if (!cachedAssets) {
    try {
      await fetchAssets();
    } catch (e) {
      throw Error(e.message);
    }
  }
  const priceMap = {};

  cachedAssets.forEach((asset) => {
    const { symbol, id } = asset;

    priceMap[`${symbol}-USD`] = fetchTicker.bind(null, id, 'USD');
    priceMap[`${symbol}-BTC`] = fetchTicker.bind(null, id, 'BTC');
  });


  return priceMap;
}

/**
 * Some symbols are used by multiple tokens. Find and keep just the highest
 * ranked ones.
 */
function dedupe(assets) {
  const res = [];

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const indexDupe = res.findIndex(other => other.symbol === asset.symbol);

    if (indexDupe > -1) {
      const { rank: dupeRank } = res[indexDupe];
      const { rank } = asset;

      if (+rank < +dupeRank) {
        res[indexDupe] = asset;
      }
    } else {
      res.push(asset);
    }
  }

  return res;
}

export default {
  fetchAssets,
  fetchTicker,
  fetchBoundPriceMap
};
