// @flow
/* eslint-disable no-magic-numbers */
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as utils from '~/app/utils';
import app from '~/app';
import exchange from '~/exchange';
import * as types from '../constants';

type Props = {
  classes: Object,
  currency: string,
  onClickBuy: Function,
  ico: Object,
  type: string,
  onTouchStart: () => void,
  active: boolean,
  isAbsolute: boolean,
  trackEvent: (c: string, a: string, l: string) => void
};

const TableRow = ({
  classes,
  ico,
  currency = 'USD',
  type = types.ROI_TOTAL,
  onTouchStart,
  active,
  onClickBuy,
  isAbsolute,
  trackEvent
}: Props) => {
  const $ = <span className={classes.dollar}>$</span>;
  const PRECISION = {
    USD: 3,
    ETH: 4,
    BTC: 8
  };
  const logo = (
    <div className={classNames(classes.td, classes.tdLogo)}>
      <img
        src={`/img/logos/${ico.id}.${ico.icon_ext || 'png'}`}
        alt={ico.name}
        className={classes.logo}
      />
    </div>
  );
  const name = (
    <div className={classNames(classes.td, classes.tdName)}>
      {ico.name}
      {!ico.supported_shapeshift && ico.supported_changelly &&
        <a
          className={classes.buyNow}
          href={`https://changelly.com/exchange/ETH/${ico.symbol}/1?ref_id=861e5d1e1238`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('Changelly', 'Click Buy Now', ico.symbol)
          }
        >
          Buy Instantly
        </a>
      }
      {ico.supported_shapeshift &&
        <button
          className={classes.buyNow}
          onClick={() => {
            onClickBuy(ico.symbol);
            trackEvent('Shapeshift Exchange', 'Initialize', ico.symbol);
          }}
        >
          Buy Instantly
        </button>
      }
    </div>
  );
  const icoDate = (
    <div className={classNames(classes.td, classes.tdDate)}>
      {moment(ico.start_date, 'MM/DD/YYYY').format('MM/DD/YY')}
    </div>
  );
  const icoPrice = (
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
  );
  const currentPrice = () => {
    const value = utils.getCurrentPrice(ico, currency);
    const displayValue = value.toFixed(PRECISION[currency]);

    return (
      <div className={classNames(classes.td, classes.tdPrice)}>
        <CSSTransitionGroup
          transitionName="percentage"
          transitionLeave={false}
          transitionEnterTimeout={800}
        >
          <span key={value}>
            {currency === 'USD' && $}
            {displayValue}
          </span>
        </CSSTransitionGroup>
      </div>
    );
  }
  const roiSinceICO = () => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: utils.getTotalROI(ico, currency) < 0
      })}
    >
      {getPrettyPercentage(utils.getTotalROI(ico, currency))}
    </div>
  );
  const periodicROI = (key: 'DAILY' | 'WEEKLY' | 'MONTHLY') => {
    const v = utils.getPeriodicROI(
      utils.getTotalROI(ico, currency),
      ico.start_date,
      utils[key]
    );
    const className = classNames(
      classes.td,
      classes.tdPrimary,
      classes.hideMobile,
      {
        [classes.tdPrimaryNegative]: v < 0
      }
    );

    return (
      <div
        className={className}
      >
        {getPrettyPercentage(v)}
      </div>
    );
  };
  const ethROISinceICO = () => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: ico.eth_roi_during_period < 0
      })}
    >
      {getPrettyPercentage(ico.eth_roi_during_period)}
    </div>
  );
  const roiVsEth = () => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: ico.roi_vs_eth < 0
      })}
    >
      {getPrettyPercentage(ico[isAbsolute ? 'roi_vs_eth_abs' : 'roi_vs_eth'])}
    </div>
  );
  const btcROISinceICO = () => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: ico.btc_roi_during_period < 0
      })}
    >
      {getPrettyPercentage(ico.btc_roi_during_period)}
    </div>
  );
  const roiVsBtc = () => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: ico.roi_vs_btc < 0
      })}
    >
      {getPrettyPercentage(ico[isAbsolute ? 'roi_vs_btc_abs' : 'roi_vs_btc'])}
    </div>
  );
  const roiSince = (key: 'day' | 'week' | 'month') => (
    <div
      className={classNames(classes.td, classes.tdPrimary, {
        [classes.tdPrimaryNegative]: ico.recentStats.roi[key] < 0,
        [classes.tdNA]: ico.recentStats.roi[key] === null
      })}
    >
      {getPrettyPercentage(ico.recentStats.roi[key])}
    </div>
  );


  return (
    <div
      key={ico.id}
      className={classNames(classes.tr, { 'is-active': active })}
      onTouchStart={onTouchStart}
    >
      {logo}
      {name}
      {icoDate}
      {icoPrice}
      {currentPrice()}
      {type === types.ROI_TOTAL && roiSinceICO()}
      {type === types.ROI_OVER_TIME && periodicROI('DAILY')}
      {type === types.ROI_OVER_TIME && periodicROI('WEEKLY')}
      {type === types.ROI_OVER_TIME && periodicROI('MONTHLY')}
      {type === types.ROI_VS_ETH && roiSinceICO()}
      {type === types.ROI_VS_ETH && ethROISinceICO()}
      {type === types.ROI_VS_ETH && roiVsEth()}
      {type === types.ROI_VS_BTC && roiSinceICO()}
      {type === types.ROI_VS_BTC && btcROISinceICO()}
      {type === types.ROI_VS_BTC && roiVsBtc()}
      {type === types.RECENT_PERFORMANCE && roiSince('day')}
      {type === types.RECENT_PERFORMANCE && roiSince('week')}
      {type === types.RECENT_PERFORMANCE && roiSince('month')}
    </div>
  );
};

function getPrettyPercentage(n) {
  const ONE_HUNDRED = 100;
  const percentage = n * ONE_HUNDRED;
  const prefix = (n > 0) && '+' || '';
  const label = `${prefix}${Math.round(percentage)}%`;

  if (n === null) {
    return 'N/A';
  }

  return (
    <CSSTransitionGroup
      transitionName="percentage"
      transitionLeave={false}
      transitionEnterTimeout={800}
    >
      <span key={n}>{label}</span>
    </CSSTransitionGroup>
  );
}

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
  tdNA: {
    color: 'hsl(0, 0%, 60%)'
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
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    textAlign: 'right',
    padding: '0',
    cursor: 'pointer',
    outline: 'none'
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

const withStyles = injectSheet(styles)(TableRow);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  isAbsolute: state.rankings.ROICalcType === 'ABSOLUTE'
});
const mapDispatchToProps = dispatch => ({
  onClickBuy: symbol => dispatch(exchange.actions.initExchange(symbol)),
  trackEvent: app.actions.trackEvent
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles);
