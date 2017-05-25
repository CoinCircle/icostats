import * as types from './constants';

const initialState = {
  tickers: ['aragon', 'humaniq', 'tokencard']
};
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_TICKER: {
      const filtered = state.tickers.filter(t => t !== action.ticker);

      return {
        tickers: [...filtered, action.ticker]
      };
    }

    case types.REMOVE_TICKER:
      return {
        tickers: state.tickers.filter(t => t !== action.ticker)
      };

    default: return state;
  }
};

export default reducer;
