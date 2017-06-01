// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setCurrency } from '../actions';

type Props = {
  classes: Object,
  activeCurrency: string,
  onSelect: string => void
};

function CurrencyPicker({ classes, activeCurrency, onSelect }: Props) {
  const currencies = ['USD', 'ETH', 'BTC'];

  return (
    <div className={classes.container}>
      <div className={classes.selectCurrencyTitle}>
        Base Currency
      </div>
      <div className={classes.selectCurrency}>
        {currencies.map(currency => (
          <div
            key={currency}
            onClick={() => onSelect(currency)}
            className={classNames(classes.selectCurrencyItem, {
              'is-active': activeCurrency === currency
            })}
          >
            {currency}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  selectCurrency: {
    display: 'flex',
    border: '1px solid hsl(200, 90%, 50%)',
    borderRadius: '3px'
  },
  selectCurrencyTitle: {
    color: 'hsl(200, 40%, 50%)',
    fontSize: '8px',
    margin: '2px 0',
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  selectCurrencyItem: {
    display: 'flex',
    width: '33%',
    padding: '3px 10px',
    color: 'hsl(200, 90%, 50%)',
    fontWeight: '400',
    fontSize: '11px',
    alignItems: 'center',
    borderRight: '1px solid hsl(200, 90%, 50%)',
    '&:last-child': {
      borderRight: 'none'
    },
    '&.is-active': {
      background: 'hsl(200, 90%, 50%)',
      color: 'hsl(222, 21%, 25%)'
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
};
const withStyles = injectSheet(styles)(CurrencyPicker);


/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  activeCurrency: state.rankings.currency
});
const mapDispatchToProps = dispatch => ({
  onSelect: currency => dispatch(setCurrency(currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles);
