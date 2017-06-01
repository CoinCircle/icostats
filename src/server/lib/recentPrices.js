/**
 * Returns the prices for a day/week/month ago for ICOs.
 * This function iterates the entire price graph data so its pretty expensive.
 * Therefore, this result should be cached.
 * @flow
 */
import moment from 'moment';

type Item = {
  ticker: string,
  price_usd: string[]
};


function findPrice(prices, targetMoment) {
  const match = prices.find((data) => {
    const [ts] = data;
    const momentPrice = moment(ts);

    return momentPrice.isSame(targetMoment, 'day');
  });

  return match && match[1];
}

export default function recentPrices(items: Item[]) {
  const now = moment();
  const dayAgo = now.clone().subtract(1, 'days');
  const weekAgo = now.clone().subtract(1, 'weeks');
  const monthAgo = now.clone().subtract(1, 'months');

  return items.map(item => ({
    ticker: item.ticker,
    recent_prices: {
      day: findPrice(item.price_usd, dayAgo),
      week: findPrice(item.price_usd, weekAgo),
      month: findPrice(item.price_usd, monthAgo)
    }
  }));
}
