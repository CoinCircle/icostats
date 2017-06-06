/**
 * Returns the prices for a day/week/month ago for ICOs.
 * This function iterates the entire price graph data so its pretty expensive.
 * Therefore, this result should be cached.
 * @flow
 */
import moment from 'moment';
import winston from 'winston';

type Item = {
  ticker: string,
  price_usd: string[]
};


function findPrice(item, targetMoment) {
  const { price_usd: prices } = item;
  // TODO
  // let dayMatch; <-- assign the first match with same day
  // Then, look for a match with same hour. If none found, fall back to dayMatch
  const match = prices.find((data) => {
    const [ts] = data;
    const momentPrice = moment(ts);

    return momentPrice.isSame(targetMoment, 'day');
  });

  const res = match && match[1];

  if (!res) {
    winston.warn(
      'No recent price found for %s for targetMoment: %s',
      item.ticker,
      targetMoment.format()
    );
  }

  return res;
}

export default function recentPrices(items: Item[]) {
  const now = moment();
  const dayAgo = now.clone().subtract(1, 'days');
  const weekAgo = now.clone().subtract(1, 'weeks');
  const monthAgo = now.clone().subtract(1, 'months');

  return items.map(item => ({
    ticker: item.ticker,
    recent_prices: {
      day: findPrice(item, dayAgo),
      week: findPrice(item, weekAgo),
      month: findPrice(item, monthAgo)
    }
  }));
}
