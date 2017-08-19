import * as types from './constants';

export const sort = (sortBy, ascending) => ({
  type: types.SORT_ITEMS,
  sortBy,
  ascending
});

export const setFilters = filters => ({
  type: types.SET_FILTERS,
  filters
});

export const setCurrency = currency => ({
  type: types.SET_CURRENCY,
  currency
});

export const changePageNumber = pageNumber => ({
  type: types.CHANGE_PAGE_NUMBER,
  pageNumber
});

export const selectAbsolute = view => ({
  type: types.SELECT_ABSOLUTE,
  view
});

export const selectRelative = view => ({
  type: types.SELECT_RELATIVE,
  view
});

export const setSearchQuery = value => ({
  type: types.SET_SEARCH_QUERY,
  value
});
