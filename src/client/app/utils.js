/* eslint-disable default-case, consistent-return */
import moment from 'moment';

export const DAILY = 1;
export const WEEKLY = 7;
export const MONTHLY = 30;
export const USD = 'USD';
export const ETH = 'ETH';
export const BTC = 'BTC';

export function getPeriodicROI(roi, startDate, period) {
  const start = moment(startDate, 'MM/DD/YYYY');
  const now = moment();
  const daysElapsed = now.diff(start, 'days');
  const periodsElapsed = daysElapsed / period;

  return roi / periodsElapsed;
}

export function getTotalROI(ico, currency) {
  switch (currency) {
    case USD:
      return ico.roi_since_ico;
    case ETH:
      return ico.roi_since_ico_eth;
    case BTC:
      return ico.roi_since_ico_btc;
  }
}

export function getICOPrice(ico, currency) {
  switch (currency) {
    case 'USD':
      return ico.implied_token_price;
    case 'ETH':
      return ico.implied_token_price / ico.eth_price_at_launch;
    case 'BTC':
      return ico.implied_token_price / ico.btc_price_at_launch;
  }
}

export function getCurrentPrice(ico, currency) {
  switch (currency) {
    case 'USD':
      return ico.price_usd;
    case 'ETH':
      return ico.price_usd / ico.eth_price_usd;
    case 'BTC':
      return ico.price_usd / ico.btc_price_usd;
  }
}
