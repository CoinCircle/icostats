/**
 * Logic for sorting. To be used as a callback for Array.prototype.sort
 * @flow
 */
/* eslint-disable max-params, complexity, max-statements */
import * as utils from '~/app/utils';
import moment from 'moment';
import type { $ICO, $Currency } from 'shared/types.flow';

/**
 * Handles sorting logic for ranking.
 * @param {Object} a
 * @param {Object} b
 * @param {String} sortBy
 * @param {Boolean} ascending
 * @return {Number}
 */
export default function handleSort(
_a: $ICO,
_b: $ICO,
sortBy: string,
ascending: boolean,
currency: $Currency
) {
  let a = _a[sortBy] || _a;
  let b = _b[sortBy] || _b;

  if (sortBy.includes('.')) {
    a = sortBy.split('.').reduce((p, c) => p[c], _a);
    b = sortBy.split('.').reduce((p, c) => p[c], _b);
  }

  switch (sortBy) {
    case 'name': {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) return ascending ? -1 : 1;
      if (a > b) return ascending ? 1 : -1;
      return 0;
    }
    case 'start_date': {
      const ma = new Date(a);
      const mb = new Date(b);

      if (ma < mb) return ascending ? -1 : 1;
      if (ma > mb) return ascending ? 1 : -1;
      return 0;
    }
    case 'ico_price': {
      a = utils.getICOPrice(a, currency);
      b = utils.getICOPrice(b, currency);
      return ascending ? (a - b) : (b - a);
    }
    case 'current_price': {
      a = utils.getCurrentPrice(a, currency);
      b = utils.getCurrentPrice(b, currency);
      return ascending ? (a - b) : (b - a);
    }
    case 'roi_per_day': {
      a = utils.getTotalROI(_a, currency);
      b = utils.getTotalROI(_b, currency);
      a = utils.getPeriodicROI(a, _a.start_date, utils.DAILY);
      b = utils.getPeriodicROI(b, _b.start_date, utils.DAILY);
      return ascending ? (a - b) : (b - a);
    }
    case 'roi_per_week': {
      a = utils.getTotalROI(_a, currency);
      b = utils.getTotalROI(_b, currency);
      a = utils.getPeriodicROI(a, _a.start_date, utils.WEEKLY);
      b = utils.getPeriodicROI(b, _b.start_date, utils.WEEKLY);
      return ascending ? (a - b) : (b - a);
    }
    case 'roi_per_month': {
      a = utils.getTotalROI(_a, currency);
      b = utils.getTotalROI(_b, currency);
      a = utils.getPeriodicROI(a, _a.start_date, utils.MONTHLY);
      b = utils.getPeriodicROI(b, _b.start_date, utils.MONTHLY);
      return ascending ? (a - b) : (b - a);
    }
    case 'roi_since_ico': {
      a = utils.getTotalROI(_a, currency);
      b = utils.getTotalROI(_b, currency);
      return ascending ? (a - b) : (b - a);
    }
    // Numeric values should use default
    default: {
      return ascending ? (a - b) : (b - a);
    }
  }
}
