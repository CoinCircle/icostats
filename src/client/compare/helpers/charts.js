/**
 * Helpers for generating data required to render charts.
 * @flow
 */
/* eslint-disable import/prefer-default-export */
import moment from 'moment';

type ChartJSLineChartDataset = {
  borderColor: string,
  data: Array<?number>,
  fill: boolean,
  label: string,
  lineTension: number,
  pointRadius: number
};

type ChartJSLineChartData = {
  labels: string[],
  datasets: ChartJSLineChartDataset[]
};

export type Price = {
  ticker: string,
  price_usd: Array<Array<number>>
};

type ICO = {
  name: string,
  ticker: string,
  implied_token_price: number
};

/**
 * Generates data for the line chart.
 */
export function generateLineChartData(
  items: Price[],
  colors: string[],
  icos: ICO[]
): ChartJSLineChartData {

  // Find the longest range
  const longest = items.slice().sort(sortByTimeRange)[0];
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
    data: labels.map(ts => mapLabel(ts, item, icos))
  }));

  return {
    labels: formatLabels(labels),
    datasets
  };
}

function mapLabel(ts, item, icos) {
  const match = item.price_usd && item.price_usd.find((datapoint, j) =>
    // Time exactly matches, or...
    datapoint[0] === ts ||
    // this is the closest timestamp we can find
    (j > 0 &&
      (item.price_usd[j - 1][0] < ts && ts <= datapoint[0])
    )
  );

  if (match) {
    const price = match[1];
    const ico = icos && icos.find(el => el.ticker === item.ticker);

    if (ico) {
      const startPrice = ico.implied_token_price;

      return roi(startPrice, price);
    }
  }

  return null;
}

/**
 * Sorts ICOs by how long they it has been since their ICO, in descending order.
 */
function sortByTimeRange(_a, _b) {
  const aLast = _a.price_usd[_a.price_usd.length - 1][0];
  const aFirst = _a.price_usd[0][0];
  const bLast = _b.price_usd[_b.price_usd.length - 1][0];
  const bFirst =  _b.price_usd[0][0];
  const a = aLast - aFirst;
  const b = bLast - bFirst;

  return b - a;
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
