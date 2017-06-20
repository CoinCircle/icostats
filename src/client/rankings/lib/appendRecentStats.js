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
  recentPrices: RecentPrice[]
) {
  let eth = recentPrices.find(r => r.symbol === 'ETH');
  let btc = recentPrices.find(r => r.symbol === 'BTC');

  eth = eth && eth.recent_prices;
  btc = btc && btc.recent_prices;

  return icos.map((ico) => {
    const { price_usd: icoPrice, symbol } = ico;
    const recent = recentPrices.find(r => r.symbol === symbol);
    const data = recent && recent.recent_prices;

    return {
      ...ico,
      recentStats: data && calculateRecentStats(data, icoPrice, eth, btc)
    };
  });
}

function calculateRecentStats(
  recent: $RecentPrices,
  currPrice: number,
  eth,
  btc
) {
  return {
    prices: {
      usd: recent,
      eth: mapValues(recent, (v, k) => eth && (v / eth[k])),
      btc: mapValues(recent, (v, k) => btc && (v / btc[k]))
    },
    roi: {
      day: ROI(recent.day, currPrice),
      week: ROI(recent.week, currPrice),
      month: ROI(recent.month, currPrice)
    }
  };
}
