/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import * as types from './constants';
import handleSort from './lib/sort';
import appendRecentStats from './lib/appendRecentStats';

const getICOs = (state, props) => props.icos || [];
const getSortBy = state => state.rankings.sortBy;
const getPathname = state => state.router.location.pathname;
const getCurrency = state => state.rankings.currency;
const getFilters = state => state.rankings.filters;
const getAscending = state => state.rankings.ascending;
const getItemsPerPage = state => state.rankings.itemsPerPage;
const getPageNumber = state => state.rankings.pageNumber;
const getRecentPrices = (state, props) => props.recentPrices || [];

/**
 * Get the selected view for rankings.
 */
export const selectView = createSelector(
  getPathname,
  (pathname) => {
    if (/^\/roi-over-time/.test(pathname)) {
      return types.ROI_OVER_TIME;
    }

    if (/^\/vs-eth/.test(pathname)) {
      return types.ROI_VS_ETH;
    }

    if (/^\/vs-btc/.test(pathname)) {
      return types.ROI_VS_BTC;
    }

    if (/^\/roi-since-ico/.test(pathname)) {
      return types.ROI_TOTAL;
    }

    return types.RECENT_PERFORMANCE;
  }
);


/**
 * Get the column that is currently sorted, or fallback to a default.
 */
export const selectSortBy = createSelector(
  getSortBy, selectView,
  (sortBy, view) => {
    if (sortBy) {
      return sortBy;
    }
    switch (view) {
      case types.ROI_OVER_TIME: {
        return 'roi_per_month';
      }
      case types.ROI_VS_ETH: {
        return 'roi_vs_eth';
      }
      case types.ROI_VS_BTC: {
        return 'roi_vs_btc';
      }
      case types.ROI_TOTAL: {
        return 'roi_since_ico';
      }
      case types.RECENT_PERFORMANCE: {
        return 'recentStats.roi.day';
      }
      default: {
        return 'roi_since_yesterday';
      }
    }
  }
);

/**
 * Filter the ICOs
 */
export const selectFilteredICOs = createSelector(
  [getICOs, getFilters],
  (icos, filters) => {
    const filtered = icos.filter((ico) => {
      if (filters.erc20 && !ico.is_erc20) {
        return false;
      }

      return true;
    });

    return filtered;
  }
);

/**
 * Append recent stats to ICOs
 */
export const selectICOsWithRecentStats = createSelector(
  [selectFilteredICOs, getRecentPrices, getCurrency], appendRecentStats
);


/**
 * Sort the ICOs
 */
export const selectSortedICOs = createSelector(
  [selectICOsWithRecentStats, selectSortBy, getAscending, getCurrency],
  (icos, sortBy, ascending, currency) =>
    icos.slice().sort((a, b) => handleSort(a, b, sortBy, ascending, currency))
);

/**
 * Select sorted, filtered ICOs for the current page.
 */
export const selectICOs = createSelector(
  [selectSortedICOs, getPageNumber, getItemsPerPage],
  (icos, pageNumber, itemsPerPage) => {
    const from = (pageNumber - 1) * itemsPerPage;
    const to = pageNumber * itemsPerPage;

    return icos.slice(from, to);
  }
);

/**
 * Find the max number of pages to be shown
 */
export const selectMaxPages = createSelector(
  [selectSortedICOs, getItemsPerPage],
  (icos, itemsPerPage) => Math.ceil(icos.length / itemsPerPage)
);
