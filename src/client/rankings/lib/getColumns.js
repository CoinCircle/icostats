/**
 * Defines the schema for what columns should be shown in the table for each
 * type of view.
 * @flow
 */
import React from 'react';
import classNames from 'classnames';
import * as types from '../constants';

type $ViewType =
  | types.RECENT_PERFORMANCE
  | types.ROI_OVER_TIME;

export type $Column = {
  key: string,
  label: string,
  addClass?: string | string[],
  extra?: React$Element<*>
};

export default function getColumns(
  type: $ViewType,
  classes: Object,
  onClickHint: Function
): $Column[] {
  const columns = defaultColumns(classes, onClickHint);

  switch (type) {
    case types.RECENT_PERFORMANCE: {
      return [
        ...columns,
        {
          key: 'recentStats.roi.day',
          label: '24 Hr ROI',
          addClass: classes.thPrimary
        },
        {
          key: 'recentStats.roi.week',
          label: 'ROI Since Last Week',
          addClass: [classes.thPrimary, classes.hideMobile]
        },
        {
          key: 'recentStats.roi.month',
          label: 'ROI Since Last Month',
          addClass: [classes.thPrimary, classes.hideMobile]
        }
      ];
    }
    case types.ROI_OVER_TIME: {
      return [
        ...columns,
        {
          key: 'roi_per_day',
          label: 'Daily ROI',
          addClass: [classes.thPrimary, classes.hideMobile]
        },
        {
          key: 'roi_per_week',
          label: 'Weekly ROI',
          addClass: [classes.thPrimary, classes.hideMobile]
        },
        {
          key: 'roi_per_month',
          label: 'Monthly ROI',
          addClass: classes.thPrimary
        }
      ];
    }
    case types.ROI_VS_ETH: {
      return [
        ...columns,
        {
          key: 'roi_since_ico',
          label: 'ROI since ICO',
          addClass: classes.thPrimary
        },
        {
          key: 'eth_roi_during_period',
          label: 'ETH ROI since ICO',
          addClass: classes.thPrimary
        },
        {
          key: 'roi_vs_eth',
          label: 'ROI vs ETH',
          addClass: classes.thPrimary
        }
      ];
    }
    case types.ROI_VS_BTC: {
      return [
        ...columns,
        {
          key: 'roi_since_ico',
          label: 'ROI since ICO',
          addClass: classes.thPrimary
        },
        {
          key: 'btc_roi_during_period',
          label: 'BTC ROI since ICO',
          addClass: classes.thPrimary
        },
        {
          key: 'roi_vs_btc',
          label: 'ROI vs BTC',
          addClass: classes.thPrimary
        }
      ];
    }
    case types.ROI_TOTAL: {
      return [
        ...columns,
        {
          key: 'roi_since_ico',
          label: 'Change (%)',
          addClass: classes.thPrimary
        }
      ];
    }
    default: {
      return [
        ...columns,
        {
          key: 'roi_since_ico',
          label: 'Change (%)',
          addClass: classes.thPrimary
        }
      ];
    }
  }
}

/**
 * Return the default columns. These will be on every view.
 */
function defaultColumns(classes: Object, onClickHint: Function) {
  return [{
    key: 'name',
    label: 'Name',
    addClass: classes.thName
  }, {
    key: 'start_date',
    label: 'ICO Date',
    addClass: classes.thDate
  }, {
    key: 'implied_token_price',
    label: 'ICO Price',
    addClass: classes.thPrice,
    extra: (
      <i
        className={classNames('material-icons', classes.help)}
        onClick={onClickHint}
      >help</i>
    )
  }, {
    key: 'current_price',
    label: 'Curr. Price',
    addClass: classes.thPrice
  }];
}
