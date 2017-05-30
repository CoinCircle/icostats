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
  type: PropTypes.string,
  onTouchStart: PropTypes.func,
  active: PropTypes.bool
};

const Row = ({ classes, ico, currency = 'USD', type = types.ROI_TOTAL, onTouchStart, active }) => {
  const $ = <span className={classes.dollar}>$</span>;
  const PRECISION = {
    USD: 3,
    ETH: 4,
    BTC: 8
  };

  return (
    <div
      key={ico.id}
      className={classNames(classes.tr, { 'is-active': active })}
      onTouchStart={onTouchStart}
    >
      <div className={classNames(classes.td, classes.tdLogo)}>
        <img
          src={`/img/logos/${ico.id}.${ico.icon_ext || 'png'}`}
          alt={ico.name}
          className={classes.logo}
        />
      </div>
      <div className={classNames(classes.td, classes.tdName)}>
        {ico.name}
        {ico.supported_changelly &&
          <a
            className={classes.buyNow}
            href={`https://changelly.com/exchange/ETH/${ico.symbol}/1?ref_id=861e5d1e1238`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.ga &&
              window.ga('send', 'event', 'Changelly', 'Click Buy Now', ico.symbol)
            }
          >
            Buy Instantly
          </a>
        }
      </div>
      <div className={classNames(classes.td, classes.tdDate)}>
        {moment(ico.start_date, 'MM/DD/YYYY').format('MM/DD/YY')}
      </div>
      <div className={classNames(classes.td, classes.tdPrice, 'tooltip-trigger')}>
        {currency === 'USD' && $}
        {utils.getICOPrice(ico, currency).toFixed(PRECISION[currency])}
        <div className={classes.tooltip}>
          <div className={classes.tooltipRow}>
            <strong>USD Raised: </strong>
            {`$${ico.raise.toLocaleString()}`}
          </div>
          <div className={classes.tooltipRow}>
            <strong>Tokens sold: </strong>
            {ico.amount_sold_in_ico.toLocaleString()}
          </div>
        </div>
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
    height: '60px',
    minHeight: '60px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    boxShadow: [
      '0px 1px hsla(0, 0%, 0%, .8)',
      '0px 2px  hsla(0, 0%, 100%, .2)'
    ].join(','),
    '&.is-active': {
      background: 'hsla(0, 0%, 100%, 0.05)'
    }
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
    maxHeight: '30px',
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
    fontWeight: 900,
    position: 'relative',
    '&.tooltip-trigger': {
      overflow: 'visible'
    }
  },
  tdName: {
    width: '100%',
    order: 0,
    position: 'relative',
    overflow: 'visible'
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
  buyNow: {
    bottom: '-11px',
    right: '0px',
    width: '60px',
    color: 'hsl(220, 30%, 60%)',
    position: 'absolute',
    fontSize: '8px',
    fontWeight: '400',
    textDecoration: 'none'
  },
  tooltip: {
    position: 'absolute',
    background: 'hsl(222, 21%, 25%)',
    right: '-24px',
    bottom: '-10px',
    left: 'auto',
    zIndex: '999999',
    fontSize: '8px',
    textAlign: 'left',
    padding: '5px',
    borderRadius: '3px',
    fontWeight: '400',
    display: 'none',
    color: 'white',
    '.tooltip-trigger:hover > &': {
      display: 'block'
    },
    '&.is-first': {
      bottom: 0
    }
  },
  tooltipRow: {
    whiteSpace: 'pre'
  },
  '@media (min-width: 768px)': {
    tr: {
      boxShadow: [
        '0px 1px hsla(0, 0%, 0%, .8)',
        '0px 2px  hsla(0, 0%, 100%, .2)',
      ].join(',')
    },
    tdLogo: {
      width: '70%'
    },
    logo: {
      maxWidth: '50px',
      maxHeight: '30px',
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
