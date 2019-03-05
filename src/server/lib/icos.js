// @flow
/* eslint-disable import/prefer-default-export */
import type { $ICO, $ICOData } from 'shared/types.flow';
import moment from 'moment';
import { absoluteDifference, relativeDifference } from 'shared/lib/calc';

type $ShapeshiftCoin = {
  image: string,
  imageSmall: string,
  name: string,
  status: 'available' | 'unavailable',
  symbol: string
}

type $ShapeshiftCoins = {
  [string]: $ShapeshiftCoin
}

const WEEK = 7;
const MONTH = 30;
const DAY = 1;

/**
 * Calculate the ICO price in USD.
 */
function icoPrice(ico: $ICOData) {
  return ico.raise / ico.amount_sold_in_ico;
}

/**
 * Total ROI since ICO in USD.
 * @param {Object} ico
 * @return {Number}
 */
function roiSinceICO(ico) {
  const roi = +ico.price_usd / icoPrice(ico);
  const diff = roi - 1;

  return diff;
}

/**
 * Total ROI Since ICO in USD, but denominated in ETH.
 */
function roiSinceICOEth(ico, ethPrice) {
  const exchangeRateLaunch = icoPrice(ico) / ico.eth_price_at_launch;
  const exchangeRate = ico.price_usd / ethPrice;
  const roi = exchangeRate / exchangeRateLaunch;
  const diff = roi - 1;

  return diff;
}

/**
 * Total ROI Since ICO in USD, but denominated in BTC.
 */
function roiSinceICOBtc(ico, btcPrice) {
  const exchangeRateLaunch = icoPrice(ico) / ico.btc_price_at_launch;
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
  const start = moment(ico.start_date);
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

function isSupportedShapeshift(ico, shapeshiftCoins: $ShapeshiftCoins) {
  return Object.prototype.hasOwnProperty.call(shapeshiftCoins, ico.symbol);
}

/**
 * Normalize the coinmarketcap response
 * @param {Object} ico object as returned from coinmarketcap
 * @return {Object} Normalized object
 */
export const normalize = (
  ico: $ICO,
  ethPrice: number,
  btcPrice: number,
  shapeshiftCoins: $ShapeshiftCoins
) => ({
  ...ico,
  eth_price_usd: ethPrice,
  btc_price_usd: btcPrice,
  implied_token_price: icoPrice(ico),
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
  supported_shapeshift: isSupportedShapeshift(ico, shapeshiftCoins),
  roi_vs_eth_abs: roiVsEth(ico, ethPrice, true),
  roi_vs_btc_abs: roiVsBtc(ico, btcPrice, true)
});
