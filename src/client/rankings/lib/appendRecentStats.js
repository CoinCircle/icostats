// @flow
import ROI from 'shared/lib/roi';
import mapValues from 'lodash/mapValues';

type ICO = {
  ticker: string,
  price_usd: number
};

type RecentPrice = {
  ticker: string,
  recent_prices: {
    day: number,
    week: number,
    month: number
  }
};

export default function appendRecentStats(
  icos: ICO[],
  recentPrices: RecentPrice[]
) {
  let eth = recentPrices.find(r => r.ticker === 'ethereum');
  let btc = recentPrices.find(r => r.ticker === 'bitcoin');

  eth = eth && eth.recent_prices;
  btc = btc && btc.recent_prices;

  return icos.map((ico) => {
    const { price_usd: icoPrice, ticker } = ico;
    const { recent_prices: data } = recentPrices.find(r => r.ticker === ticker);

    return {
      ...ico,
      recentStats: data && calculateRecentStats(data, icoPrice, eth, btc)
    };
  });
}

function calculateRecentStats(recent, currPrice, eth, btc) {
  return {
    prices: {
      usd: recent,
      eth: eth && mapValues(recent, (v, k) => v / eth[k]),
      btc: btc && mapValues(recent, (v, k) => v / btc[k])
    },
    roi: {
      day: ROI(recent.day, currPrice),
      week: ROI(recent.week, currPrice),
      month: ROI(recent.month, currPrice)
    }
  };
}
