// @flow
import ROI from 'shared/lib/roi';
import mapValues from 'lodash/mapValues';

type ICO = {
  ticker: string,
  price_usd: number
};

type $RecentPrices = {
  day: number,
  week: number,
  month: number
};

type RecentPrice = {
  symbol: string,
  recent_prices: $RecentPrices
};

export default function appendRecentStats(
  icos: ICO[],
  recentPrices: RecentPrice[],
  currency: string
) {
  return icos.map((ico) => {
    const { price_usd: symbolPrice, symbol } = ico;
    const recent = recentPrices.find(r => r.symbol === symbol)

    let data
    let currPrice

    if (currency === 'USD') {
      currPrice = symbolPrice
      data = recent && recent.recent_prices
    } else {
      const currencyPrice = ico[`${currency.toLowerCase()}_price_usd`]
      const currencyRecent = recentPrices.find(r => r.symbol === currency)
      const symbolPriceData = recent && recent.recent_prices
      const currencyPriceData = currencyRecent && currencyRecent.recent_prices
      currPrice = symbolPrice / currencyPrice
      data = mapValues(currencyPriceData, (v, k) => symbolPriceData[k] && (symbolPriceData[k] / v))
    }

    return {
      ...ico,
      recentStats: data && calculateRecentStats(data, currPrice)
    };
  });
}

function calculateRecentStats(
  recent: $RecentPrices,
  currPrice: number
) {
  return {
    prices: recent,
    roi: mapValues(recent, (v, k) => ROI(v, currPrice))
  };
}
