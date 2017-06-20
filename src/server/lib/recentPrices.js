/**
 * Returns the prices for a day/week/month ago for ICOs.
 * This function iterates the entire price graph data so its pretty expensive.
 * Therefore, this result should be cached.
 * @flow
 */
import moment from 'moment';
import winston from 'winston';

type Item = {
  symbol: string,
  ticker: string,
  price_usd: string[]
};
type $Price = {
  price_usd: number,
  timestamp: number
};
type $PriceHistory = {
  symbol: string,
  latest: $Price,
  prices: $Price[]
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
      item.symbol,
      targetMoment.format()
    );
  }

  return res;
}

function merge(coinmarketcapPrices, priceHistory) {
  const res = [...coinmarketcapPrices];

  for (let i = 0; i < priceHistory.length; i++) {
    const { symbol, prices } = priceHistory[i];
    const exists = res.some(el => el.symbol === symbol);

    if (!exists) {
      const item = {
        symbol,
        price_usd: prices.map(
          ({ price_usd, timestamp }) => [timestamp, price_usd]
        )
      };

      res.push(item);
    }
  }

  return res;
}

export default function recentPrices(
  items: Item[],
  priceHistory: $PriceHistory[]
) {
  const now = moment();
  const dayAgo = now.clone().subtract(1, 'days');
  const weekAgo = now.clone().subtract(1, 'weeks');
  const monthAgo = now.clone().subtract(1, 'months');
  const merged = merge(items, priceHistory);

  return merged.map(item => ({
    symbol: item.symbol,
    recent_prices: {
      day: findPrice(item, dayAgo),
      week: findPrice(item, weekAgo),
      month: findPrice(item, monthAgo)
    }
  }));
}
