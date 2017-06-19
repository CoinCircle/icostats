import * as types from './constants';

const HIDE_NAV_WIDTH = 768;
const hideNav = window && window.innerWidth < HIDE_NAV_WIDTH;

const initialState = {
  isNavOpen: !hideNav,
  isFeedbackOpen: false
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.TOGGLE_NAV:
      return {
        isNavOpen: !state.isNavOpen
      };

    case types.OPEN_FEEDBACK:
      return {
        ...state,
        isFeedbackOpen: true
      };

    case types.CLOSE_FEEDBACK:
      return {
        ...state,
        isFeedbackOpen: false
      };

    default: return state;
  }
};

export default appReducer;
