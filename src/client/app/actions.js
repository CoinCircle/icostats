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

export const trackEvent = (category, action, label) => {
  if (window.ga && typeof window.ga === 'function') {
    window.ga('send', 'event', category, action, label);
  }
};
