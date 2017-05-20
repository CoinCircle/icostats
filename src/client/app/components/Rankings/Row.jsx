/* eslint-disable no-magic-numbers */
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import moment from 'moment';

const propTypes = {
  ico: PropTypes.object
};

const Row = ({ classes, ico }) => {
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
      <div className={classNames(classes.td, classes.tdSmall)}>
        {ico.symbol}
      </div>
      <div className={classes.td}>
        {moment(ico.start_date).format('MM/DD/YY')}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        {$}{ico.implied_token_price.toFixed(3)}
      </div>
      <div className={classNames(classes.td, classes.tdPrice)}>
        {$}{ico.price_usd.toFixed(2)}
      </div>
      <div className={classNames(classes.td, classes.tdChange)}>
        {getPrettyPercentage(ico.change_since_ico)}
      </div>
    </div>
  );
};

function getPrettyPercentage(n) {
  const ONE_HUNDRED = 100;
  const percentage = n * ONE_HUNDRED;
  const prefix = (n > 0) && '+' || '';

  return `${prefix}${percentage.toFixed(2)}%`;
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
    fontSize: '18px',
    fontWeight: 200,
    textAlign: 'right'
  },
  logo: {
    maxHeight: '40px',
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
    fontSize: '22px',
    fontWeight: 900
  },
  tdChange: {
    color: '#29E186',
    fontSize: '26px',
    fontWeight: 900,
    width: '150%'
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
  }
};

export default injectSheet(styles)(Row);
