/* eslint-disable newline-after-var */
import * as types from './constants';

const initialState = {
  sortBy: null,
  ascending: false,
  currency: 'USD',
  filters: {
    erc20: false
  },
  pageNumber: 1,
  itemsPerPage: 30,
  ROICalcType: 'RELATIVE'
};
const rankingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SORT_ITEMS: {
      return {
        ...state,
        sortBy: action.sortBy,
        ascending: action.ascending
      };
    }

    case types.SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };

    case types.SET_CURRENCY:
      return {
        ...state,
        currency: action.currency
      };

    case types.CHANGE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      };

    case types.SELECT_ABSOLUTE:
      return {
        ...state,
        ROICalcType: 'ABSOLUTE'
      };

    case types.SELECT_RELATIVE:
      return {
        ...state,
        ROICalcType: 'RELATIVE'
      };

    default: return state;
  }
};

export default rankingsReducer;
