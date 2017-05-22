/* eslint-disable no-magic-numbers */
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import moment from 'moment';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as types from './constants';
import * as utils from 'app/utils';

const propTypes = {
  ico: PropTypes.object,
  type: PropTypes.string
};

const Row = ({ classes, ico, currency = 'USD', type = types.ROI_TOTAL }) => {
  const $ = <span className={classes.dollar}>$</span>;
  const PRECISION = {
    USD: 3,
    ETH: 4,
    BTC: 8
  };

  return (
    <div key={ico.id} className={classes.tr}>
      <div className={classNames(classes.td, classes.tdLogo)}>
        <img
          src={`/img/logos/${ico.id}.${ico.icon_ext || 'png'}`}
          alt={ico.name}
          className={classes.logo}
        />
      </div>
      <div className={classNames(classes.td, classes.tdName)}>
        <a
          href={`https://coinmarketcap.com/assets/${ico.ticker}/`}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ico.name}
        </a>
      </div>
      <div className={classNames(classes.td, classes.tdDate)}>
        {moment(ico.start_date, 'MM/DD/YYYY').format('MM/DD/YY')}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        {currency === 'USD' && $}
        {utils.getICOPrice(ico, currency).toFixed(PRECISION[currency])}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        <CSSTransitionGroup
          transitionName="percentage"
          transitionLeave={false}
          transitionEnterTimeout={800}
        >
          <span key={moment.now()}>
            {currency === 'USD' && $}
            {utils.getCurrentPrice(ico, currency).toFixed(PRECISION[currency])}
          </span>
        </CSSTransitionGroup>
      </div>
      {type === types.ROI_TOTAL &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: utils.getTotalROI(ico, currency) <= 0
        })}>
          {getPrettyPercentage(utils.getTotalROI(ico, currency))}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div
          className={classNames(
            classes.td,
            classes.tdPrimary,
            classes.hideMobile,
            {
              [classes.tdPrimaryNegative]: utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.DAILY) <= 0
            }
          )}
        >
          {getPrettyPercentage(utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.DAILY))}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div className={classNames(classes.td, classes.tdPrimary, classes.hideMobile, {
          [classes.tdPrimaryNegative]: utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.WEEKLY) <= 0
        })}>
          {getPrettyPercentage(utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.WEEKLY))}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.MONTHLY) <= 0
        })}>
          {getPrettyPercentage(utils.getPeriodicROI(utils.getTotalROI(ico, currency), ico.start_date, utils.MONTHLY))}
        </div>
      }
      {type === types.ROI_VS_ETH &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: utils.getTotalROI(ico, currency) <= 0
        })}>
            {getPrettyPercentage(utils.getTotalROI(ico, currency))}
        </div>
      }
      {type === types.ROI_VS_ETH &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: ico.eth_roi_during_period <= 0
        })}>
            {getPrettyPercentage(ico.eth_roi_during_period)}
        </div>
      }
      {type === types.ROI_VS_ETH &&
        <div
          className={classNames(classes.td, classes.tdPrimary, {
            [classes.tdPrimaryNegative]: ico.roi_vs_eth <= 0
          })}
        >
          {getPrettyPercentage(ico.roi_vs_eth)}
        </div>
      }
      {type === types.ROI_VS_BTC &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: utils.getTotalROI(ico, currency) <= 0
        })}>
            {getPrettyPercentage(utils.getTotalROI(ico, currency))}
        </div>
      }
      {type === types.ROI_VS_BTC &&
        <div className={classNames(classes.td, classes.tdPrimary, {
          [classes.tdPrimaryNegative]: ico.btc_roi_during_period <= 0
        })}>
            {getPrettyPercentage(ico.btc_roi_during_period)}
        </div>
      }
      {type === types.ROI_VS_BTC &&
        <div
          className={classNames(classes.td, classes.tdPrimary, {
            [classes.tdPrimaryNegative]: ico.roi_vs_btc <= 0
          })}
        >
          {getPrettyPercentage(ico.roi_vs_btc)}
        </div>
      }
    </div>
  );
};

function getPrettyPercentage(n) {
  const ONE_HUNDRED = 100;
  const percentage = n * ONE_HUNDRED;
  const prefix = (n > 0) && '+' || '';
  const label = `${prefix}${percentage.toFixed(2)}%`;

  return (
    <CSSTransitionGroup
      transitionName="percentage"
      transitionLeave={false}
      transitionEnterTimeout={800}
    >
      <span key={moment.now()}>{label}</span>
    </CSSTransitionGroup>
  );
}

Row.propTypes = propTypes;

const styles = {
  tr: {
    width: '150%',
    height: '60px',
    minHeight: '60px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    boxShadow: [
      '0px 1px hsla(0, 0%, 0%, .8)',
      '0px 2px  hsla(0, 0%, 100%, .2)',
      '-17px 0px 24px -13px hsla(0, 100%, 100%, 0.2) inset'
    ].join(',')
  },
  td: {
    flexGrow: '2',
    width: '100%',
    fontSize: '13px',
    fontWeight: 200,
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0 10px',
    order: 1
  },
  logo: {
    maxWidth: '30px',
    height: 'auto'
  },
  tdLogo: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    maxHeight: '40px',
    alignItems: 'center',
    order: 0
  },
  tdPrice: {
    color: 'hsl(220, 5%, 76%)',
    fontSize: '13px',
    fontWeight: 900
  },
  tdName: {
    width: '100%',
    order: 0
  },
  tdDate: {
    width: '100%',
    fontSize: '12px'
  },
  tdPrimary: {
    color: 'hsl(150, 75%, 45%)',
    fontSize: '15px',
    fontWeight: 900,
    width: '140%',
    order: 0
  },
  tdPrimaryNegative: {
    color: 'hsl(15, 75%, 60%)',
  },
  tdSmall: {
    width: '65%'
  },
  dollar: {
    fontWeight: 400,
    fontSize: '12px',
    color: 'hsl(0, 0%, 45%)',
    verticalAlign: 'baseline',
    paddingRight: '3px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(195, 89%, 72%)'
    }
  },
  '@media (min-width: 768px)': {
    tr: {
      width: '100%',
      boxShadow: [
        '0px 1px hsla(0, 0%, 0%, .8)',
        '0px 2px  hsla(0, 0%, 100%, .2)',
      ].join(',')
    },
    tdLogo: {
      width: '70%'
    },
    logo: {
      maxWidth: '40px'
    }
  },
  '@media (min-width: 1024px)': {
    td: {
      fontSize: '15px'
    },
    tdDate: {
      fontSize: '12px'
    },
    tdPrimary: {
      fontSize: '17px'
    }
  }
};

export default injectSheet(styles)(Row);
