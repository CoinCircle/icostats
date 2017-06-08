/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { absoluteDifference, relativeDifference } from 'shared/lib/calc';

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
 * Return the ROI since ICO, denomianted in ETH.
 */
function roiSinceICOEth(ico, ethPrice) {
  const exchangeRateLaunch = ico.implied_token_price / ico.eth_price_at_launch;
  const exchangeRate = ico.price_usd / ethPrice;
  const roi = exchangeRate / exchangeRateLaunch;
  const diff = roi - 1;

  return diff;
}

/**
 * Return the ROI since ICO, denomianted in BTC.
 */
function roiSinceICOBtc(ico, btcPrice) {
  const exchangeRateLaunch = ico.implied_token_price / ico.btc_price_at_launch;
  const exchangeRate = ico.price_usd / btcPrice;
  const roi = exchangeRate / exchangeRateLaunch;
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

function roiVsEth(ico, ethPrice, abs = false) {
  const altROI = roiSinceICO(ico);
  const ethROI = ethROISinceICO(ico, ethPrice);

  if (abs) {
    return absoluteDifference(ethROI, altROI);
  }

  return relativeDifference(ethROI, altROI);
}


function roiVsBtc(ico, btcPrice, abs = false) {
  const altROI = roiSinceICO(ico);
  const btcROI = btcROISinceICO(ico, btcPrice);

  if (abs) {
    return absoluteDifference(btcROI, altROI);
  }

  return relativeDifference(btcROI, altROI);
}

function ethROISinceICO(ico, ethPrice) {
  const roi = ethPrice / ico.eth_price_at_launch;
  const diff = roi - 1;

  return diff;
}

function btcROISinceICO(ico, btcPrice) {
  const roi = btcPrice / ico.btc_price_at_launch;
  const diff = roi - 1;

  return diff;
}

/**
 * Normalize the coinmarketcap response
 * @param {Object} ico object as returned from coinmarketcap
 * @return {Object} Normalized object
 */
export const normalize = (ico, ethPrice, btcPrice) => ({
  ...ico,
  volume_usd_24h: ico['24h_volume_usd'],
  eth_price_usd: ethPrice,
  btc_price_usd: btcPrice,
  roi_since_ico: roiSinceICO(ico),
  roi_since_ico_eth: roiSinceICOEth(ico, ethPrice),
  roi_since_ico_btc: roiSinceICOBtc(ico, btcPrice),
  roi_per_week: roiPerDays(ico, WEEK),
  roi_per_day: roiPerDays(ico, DAY),
  roi_per_month: roiPerDays(ico, MONTH),
  eth_roi_during_period: ethROISinceICO(ico, ethPrice),
  btc_roi_during_period: btcROISinceICO(ico, btcPrice),
  roi_vs_eth: roiVsEth(ico, ethPrice),
  roi_vs_btc: roiVsBtc(ico, btcPrice),
  roi_vs_eth_abs: roiVsEth(ico, ethPrice, true),
  roi_vs_btc_abs: roiVsBtc(ico, btcPrice, true)
});
