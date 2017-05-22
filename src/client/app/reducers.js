import * as types from './constants';

const HIDE_NAV_WIDTH = 768;
const hideNav = window && window.innerWidth < HIDE_NAV_WIDTH;

const initialState = {
  isNavOpen: !hideNav
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.TOGGLE_NAV:
      return {
        isNavOpen: !state.isNavOpen
      };
    default: return state;
  }
};

export default appReducer;
