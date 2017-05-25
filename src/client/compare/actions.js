import * as types from './constants';

export const addTicker = ticker => ({
  type: types.ADD_TICKER,
  ticker
});

export const removeTicker = ticker => ({
  type: types.REMOVE_TICKER,
  ticker
});
