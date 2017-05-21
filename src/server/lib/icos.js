/* eslint-disable import/prefer-default-export */
import moment from 'moment';

const WEEK = 7;
const MONTH = 30;
const DAY = 1;

/**
 * Find the change in price since the ICO.
 * @param {Object} ico
 * @return {Number}
 */
function roiSinceICO(ico) {
  const roi = +ico.price_usd / ico.implied_token_price;
  const diff = roi - 1;

  return diff;
}

/**
 * Return the average ROI per some time period.
 * Examples:
 * - Weekly gains: roiPerDays(ico, 7)
 * - Yearly gains: roiPerDays(ico, 365)
 * @param {Object} ico
 * @param {Number} numDays
 * @return {Number}
 */
function roiPerDays(ico, numDays) {
  const diff = roiSinceICO(ico);
  const start = moment(ico.start_date, 'MM/DD/YYYY');
  const now = moment();
  const daysElapsed = now.diff(start, 'days');
  const periodsElapsed = daysElapsed / numDays;

  return diff / periodsElapsed;
}

function roiVsEth(ico, ethPrice) {
  const diff = roiSinceICO(ico);
  const ethDiff = ethROISinceICO(ico, ethPrice);

  return diff - ethDiff;
}

function ethROISinceICO(ico, ethPrice) {
  const roi = ethPrice / ico.eth_price_at_launch;
  const diff = roi - 1;

  return diff;
}

/**
 * Normalize the coinmarketcap response
 * @param {Object} ico object as returned from coinmarketcap
 * @return {Object} Normalized object
 */
export const normalize = (ico, ethPrice) => ({
  ...ico,
  volume_usd_24h: ico['24h_volume_usd'],
  roi_since_ico: roiSinceICO(ico),
  roi_per_week: roiPerDays(ico, WEEK),
  roi_per_day: roiPerDays(ico, DAY),
  roi_per_month: roiPerDays(ico, MONTH),
  eth_roi_during_period: ethROISinceICO(ico, ethPrice),
  roi_vs_eth: roiVsEth(ico, ethPrice)
});
