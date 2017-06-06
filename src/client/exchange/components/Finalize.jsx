// @flow
import type { Dispatch } from 'redux';
import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { Action, ReduxState } from '../types';
import GetQuoteColumn from './GetQuoteColumn';
import { fetchLimit, fetchShift } from '../actions';

type Props = {
  classes: Object,
  orderStatus: string,
  coins: Object,
  amount: number,
  from: string,
  depositAddress: string
};

function Finalize({
  classes: c,
  orderStatus,
  coins,
  amount,
  from,
  depositAddress
}: Props) {
  const messages = {
    'complete': 'Exchange Complete! The coins should be in your wallet.',
    'received': 'Progress (2/3): Received Deposit - Performing Exchange'
  };
  const title = (
    <div className={c.title}>
      <div>
        Send {amount} {from} to:
      </div>
      <div>
        You&apos;ll Receive
      </div>
    </div>
  );
  const addressColumn = (
    <div className={c.column}>
      <pre className={c.address}>
        {depositAddress}
      </pre>
      <div
        className={classNames(c.progress, {
          'is-complete': orderStatus === 'complete'
        })}
      >
        {messages[orderStatus] || 'Progress (1/3): Awaiting Deposit'}
      </div>
    </div>
  );
  const body = (
    <div className={c.body}>
      {addressColumn}
      <GetQuoteColumn which="to" disableSelect coins={coins} />
    </div>
  );

  return (
    <div className={c.container}>
      {title}
      {body}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '2'
  },
  title: {
    color: 'white',
    fontWeight: 900,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px',
    textTransform: 'uppercase',
    zIndex: 2,
    '& > div:last-child': {
      color: 'hsl(0, 0%, 20%)'
    }
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 2,
    width: '100%',
    zIndex: 2
  },
  column: {
    display: 'flex',
    flexGrow: 2,
    maxWidth: '45%',
    flexDirection: 'column',
    color: 'hsl(0, 0%, 100%)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '&.mod-inverted': {
      color: 'hsl(0, 0%, 20%)',
      alignItems: 'flex-end'
    }
  },
  address: {
    color: 'hsl(186, 100%, 50%)',
    margin: '7px 0',
    padding: '9px 15px',
    fontSize: '12px',
    background: 'hsla(0, 0%, 0%, 0.5)',
    fontWeight: '700',
    borderRadius: '3px',
    boxShadow: '0px 1px 1px hsla(0, 0%, 0%, 0.6) inset, 0px 1px 1px hsla(0, 0%, 100%, 0.2)',
    '&::selection': {
      background: '#b5c2ff',
      color: 'white'
    }
  },
  progress: {
    color: 'hsl(150, 100%, 59%)',
    textTransform: 'uppercase',
    fontSize: '13px',
    paddingTop: '6px',
    paddingLeft: '3px',
    fontWeight: '700',
    animationName: 'flash',
    animationIterationCount: 'infinite',
    animationDuration: '2.5s',
    '&.is-complete': {
      animationName: 'none'
    }
  }
};

const styled = injectSheet(styles)(Finalize);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state: {exchange: ReduxState}) => ({
  from: state.exchange.from,
  to: state.exchange.to,
  amount: state.exchange.amount,
  depositAddress: state.exchange.depositAddress,
  receivingAddress: state.exchange.receivingAddress,
  isReceivingAddressValid: state.exchange.isReceivingAddressValid,
  orderId: state.exchange.orderId,
  orderStatus: state.exchange.orderStatus
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchLimit: pair => dispatch(fetchLimit(pair)),
  fetchShift: (receivingAddress, pair) =>
    dispatch(fetchShift(receivingAddress, pair))
});

export default connect(mapStateToProps, mapDispatchToProps)(styled);
