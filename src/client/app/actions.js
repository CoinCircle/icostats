import * as types from './constants';

export const toggleNav = () => ({
  type: types.TOGGLE_NAV
});

export const openFeedback = () => ({
  type: types.OPEN_FEEDBACK
});

export const closeFeedback = () => ({
  type: types.CLOSE_FEEDBACK
});
