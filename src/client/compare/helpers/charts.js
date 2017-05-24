/* eslint-disable import/prefer-default-export */
/**
 * Helpers for generating data required to render charts.
 * @flow
 */

export type Price = {
  ticker: String,
  price_usd: Array<Array<number>>
};

export function generateLineChartData(
  items: Array<Price>,
  colors: Array<String>
) {


  // Find the longest range
  const longest = items.slice().sort((a, b) =>
    b.price_usd.length - a.price_usd.length
  )[0];
  const labels = [];

  longest.price_usd.forEach((datapoint) => {
    const timestamp = datapoint[0];
    const isMatch = items.every(item =>
      // time is less than the min time
      timestamp < item.price_usd[0][0] ||
      item.price_usd.some(_datapoint => _datapoint[0] === timestamp)
    );

    if (isMatch) {
      labels.push(timestamp);
    }
  });
  const datasets = items.map((item, i) => ({
    label: item.ticker,
    borderColor: colors[i],
    data: labels.map((ts) => {
      const match = item.price_usd.find(datapoint => datapoint[0] === ts);

      if (match) {
        return match[1];
      }

      return null;
    })
  }));

  return {
    labels,
    datasets
  };
}
