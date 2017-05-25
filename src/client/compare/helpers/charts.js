/* eslint-disable import/prefer-default-export */
/**
 * Helpers for generating data required to render charts.
 * @flow
 */
import moment from 'moment';

export type Price = {
  ticker: String,
  price_usd: Array<Array<number>>
};

export function generateLineChartData(
  items: Array<Price>,
  colors: Array<String>
) {


  // Find the longest range
  const longest = items.slice().sort((_a, _b) => {
    const a = _a.price_usd[_a.price_usd.length - 1][0] - _a.price_usd[0][0];
    const b = _b.price_usd[_b.price_usd.length - 1][0] - _b.price_usd[0][0];

    return b - a;
  })[0];
  let labels = [];

  longest.price_usd.forEach((datapoint) => {
    const timestamp = datapoint[0];
    const isMatch = items.every(item =>
      // time is less than the min time
      timestamp < item.price_usd[0][0] ||
      item.price_usd.some((_datapoint, j) =>
        _datapoint[0] === timestamp ||
        (j > 0 &&
          (item.price_usd[j-1][0] < timestamp && timestamp <= datapoint[0])
        )
      )
    );

    if (isMatch) {
      labels.push(timestamp);
    }
  });

  labels = roundToDays(labels);

  const datasets = items.map((item, i) => ({
    label: item.ticker,
    borderColor: colors[i],
    fill: false,
    lineTension: 0.5,
    pointRadius: 0,
    data: labels.map((ts) => {
      const match = item.price_usd.find((datapoint, j) =>
        datapoint[0] === ts ||
        (j > 0 &&
          (item.price_usd[j-1][0] < ts && ts <= datapoint[0])
        )
      );

      if (match) {
        return match[1];
      }

      return null;
    })
  }));

  return {
    labels: formatLabels(labels),
    datasets
  };
}

function formatLabels(labels) {
  return labels.map(label => moment(label).format('MM/DD/YYYY'));
}

function roi(startPrice, currPrice) {
  const isDecrease = currPrice < startPrice;
  const diff = isDecrease ? (startPrice - currPrice) : (currPrice - startPrice);
  const delta = diff / startPrice;

  return isDecrease ? (0 - delta) : delta;
}

export function roundToDays(timestamps: Array<number>) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const first = timestamps[0];
  const res = [first];

  for (let i = 1; i < timestamps.length; i++) {
    const head = res[res.length - 1];
    const target = head + ONE_DAY;
    const prev = timestamps[i - 1]
    const curr = timestamps[i];

    // If prev < (head + 1 day) < curr
    //  push curr
    if (prev < target && target <= curr) {
      res.push(curr);
    }
  }

  return res;
}
