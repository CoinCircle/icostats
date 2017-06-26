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
    const { price_usd: icoPrice, symbol } = ico;
    const recent = currency === 'USD'
      ? recentPrices.find(r => r.symbol === symbol)
      : recentPrices.find(r => r.symbol === currency)
    const data = recent && recent.recent_prices;
    return {
      ...ico,
      recentStats: data && calculateRecentStats(data, icoPrice)
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
