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

export const selectAbsolute = () => ({
  type: types.SELECT_ABSOLUTE
});

export const selectRelative = () => ({
  type: types.SELECT_RELATIVE
});
