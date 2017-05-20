/* eslint-disable no-magic-numbers */
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import moment from 'moment';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as types from './constants';

const propTypes = {
  ico: PropTypes.object,
  type: PropTypes.string
};

const Row = ({ classes, ico, type = types.ROI_TOTAL }) => {
  const $ = <span className={classes.dollar}>$</span>;

  return (
    <div key={ico.id} className={classes.tr}>
      <div className={classNames(classes.td, classes.tdLogo)}>
        <img
          src={`/img/logos/${ico.id}.${ico.icon_ext || 'png'}`}
          alt={ico.name}
          className={classes.logo}
        />
      </div>
      <div className={classes.td}>
        <a
          href={`https://coinmarketcap.com/assets/${ico.ticker}/`}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ico.name}
        </a>
      </div>
      <div className={classes.td}>
        {moment(ico.start_date, 'MM/DD/YYYY').format('MM/DD/YY')}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        {$}{ico.implied_token_price.toFixed(3)}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        <CSSTransitionGroup
          transitionName="percentage"
          transitionLeave={false}
          transitionEnterTimeout={800}
        >
          <span key={moment.now()}>
            {$}{ico.price_usd.toFixed(2)}
          </span>
        </CSSTransitionGroup>
      </div>
      {type === types.ROI_TOTAL &&
        <div className={classNames(classes.td, classes.tdChange)}>
          {getPrettyPercentage(ico.change_since_ico)}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div className={classNames(classes.td, classes.tdChange)}>
          {getPrettyPercentage(ico.roi_per_day)}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div className={classNames(classes.td, classes.tdChange)}>
          {getPrettyPercentage(ico.roi_per_week)}
        </div>
      }
      {type === types.ROI_OVER_TIME &&
        <div className={classNames(classes.td, classes.tdChange)}>
          {getPrettyPercentage(ico.roi_per_month)}
        </div>
      }
      {type === types.ROI_VS_ETH &&
        <div className={classNames(classes.td, classes.tdChange)}>
            {getPrettyPercentage(ico.eth_roi_during_period)}
        </div>
      }
      {type === types.ROI_VS_ETH &&
        <div className={classNames(classes.td, classes.tdChange)}>
          {getPrettyPercentage(ico.roi_vs_eth)}
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
    width: '100%',
    height: '60px',
    minHeight: '60px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 1px hsla(0, 0%, 0%, .8), 0px 2px  hsla(0, 0%, 100%, .2)'
  },
  td: {
    flexGrow: '2',
    width: '100%',
    fontSize: '16px',
    fontWeight: 200,
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  logo: {
    maxHeight: '30px',
    maxWidth: '100%',
    width: 'auto'
  },
  tdLogo: {
    display: 'flex',
    justifyContent: 'center',
    width: '70%'
  },
  tdPrice: {
    color: 'hsl(220, 5%, 76%)',
    fontSize: '19px',
    fontWeight: 900
  },
  tdChange: {
    color: 'hsl(150, 75%, 45%)',
    fontSize: '22px',
    fontWeight: 900,
    width: '125%'
  },
  tdSmall: {
    width: '65%'
  },
  dollar: {
    fontWeight: 400,
    fontSize: '15px',
    color: 'hsl(0, 0%, 45%)',
    verticalAlign: 'middle',
    paddingRight: '3px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: 'hsl(195, 89%, 72%)'
    }
  },
  '@media (max-width: 968px)': {
    td: {
      fontSize: '12px'
    },
    logo: {
      maxHeight: '20px'
    },
    tdPrice: {
      display: 'none',
      fontSize: '14px'
    },
    tdChange: {
      fontSize: '14px'
    }
  }
};

export default injectSheet(styles)(Row);
