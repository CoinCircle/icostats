/**
 * Normalized analytics function similar to segment's API
 * @flow
 */
import has from 'lodash/has';

type $AnalyticsEvent = {
  category?: string,
  action: string,
  label?: string,
  value?: string,
  meta: Object
};

const defaultPayload = {
  category: 'UI Event',
  action: '',
  meta: {}
};

export const EventTypes = {
  track: 'analytics/track',
  identify: 'analytics/identify'
};

const analytics = {
  install(obj: Object) {
    if (!has(obj, 'analytics')) {
      obj.analytics = this; // eslint-disable-line
    }
  },
  track(event: $AnalyticsEvent = defaultPayload): void {
    const { category, action, label, value, meta } = event;
    const gaParams = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value || null
    };
    const mixpanelParams = {
      ...meta,
      category,
      action,
      label,
      value,
    };

    window.ga('send', gaParams);
    window.mixpanel.track(action, mixpanelParams);
  },
  identify(address: string): void {
    window.mixpanel.identify(address);
    window.ga('set', 'userId', address);

    // TODO store in db when someone has been aliased, since it should only
    // be called the first time they authenticate.
    // window.mixpanel.alias(/* ethaddress */)
  }
};

export function middleware(/* store: Object */) {
  return (next: $FlowTODO) => (action: Object) => {
    const hasAnalytics = has(action, 'meta.analytics');

    if (hasAnalytics) {
      const { eventType, eventPayload } = action.meta.analytics;
      const { category, event, label, value, ...meta } = eventPayload;
      const trackParams = {
        category: category || 'UI Event',
        action: event,
        label,
        value,
        meta
      };

      if (eventType === EventTypes.track) {
        analytics.track(trackParams);
      }
    }

    return next(action);
  };
}

export default analytics;
