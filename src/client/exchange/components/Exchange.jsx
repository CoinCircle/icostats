// @flow
import type { Dispatch } from 'redux';
import React from 'react';
import injectSheet from 'react-jss';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import classNames from 'classnames';
import app from '~/app';
import type { Action, ReduxState } from '../types';
import GetQuote from './GetQuote';
import Finalize from './Finalize';
import {
  fetchLimit,
  fetchShift,
  fetchOrderStatus,
  hideExchange
} from '../actions';

type Props = {
  classes: Object,
  isFetching: boolean,
  coins: Object,
  from: string,
  to: string,
  fetchLimit: (pair: string) => void,
  isReceivingAddressValid: boolean,
  orderId: string,
  fetchOrderStatus: (orderId: string) => void,
  orderStatus: string,
  receivingAddress: string,
  fetchShift: (receivingAddress: string, pair: string) => void,
  depositAddress: string,
  hideExchange: () => void,
  trackEvent: (c: string, a: string, l?: string) => void
};

type State = {
  isFromOpen: boolean,
  isToOpen: boolean
};

class Exchange extends React.Component {
  props: Props;
  state: State;
  interval: number;
  maxIntervals: number = 144; // one hour (if delay is 5 sec)
  intervalCount: number = 0;
  state = {
    isFromOpen: false,
    isToOpen: false
  };

  // Get the min/max deposit amounts.
  componentDidMount() {
    const { from, to } = this.props;
    const pair = `${from}_${to}`;

    this.props.fetchLimit(pair);
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyup);
  }

  componentWillReceiveProps(nextProps) {
    const { isReceivingAddressValid, orderId, to, from } = this.props;

    // Perform shift once a valid receiving address is input.
    if (!isReceivingAddressValid && nextProps.isReceivingAddressValid) {
      this.handleClickShift();
    }

    // Poll for updates on an initiated exchange.
    if (!orderId && nextProps.orderId && !this.interval) {
      const fn = () => {
        if (this.intervalCount >= this.maxIntervals) {
          clearInterval(this.interval);
          delete this.interval;
        }
        this.props.fetchOrderStatus(nextProps.orderId);
        this.intervalCount = this.intervalCount + 1;
      };

      fn();
      this.interval = setInterval(fn, 5000);
    }

    // Stop polling once the exchange is complete.
    // TODO: Somehow stop polling if they never end up completing the exchange.
    if (this.interval && nextProps.orderStatus === 'complete') {
      clearInterval(this.interval);
      delete this.interval;
      this.props.trackEvent('Shapeshift Exchange', 'Complete', `${from}-${to}`);
    }

    // Fetch new limits if the selected coins change.
    if ((to !== nextProps.to) || (from !== nextProps.from)) {
      const pair = `${nextProps.from}_${nextProps.to}`;

      this.props.fetchLimit(pair);
    }
  }

  handleKeyup = (event: Event) => {
    if (event.key === 'Escape') {
      this.props.hideExchange();
      this.props.trackEvent('Shapeshift Exchange', 'Close');
    }
  }

  handleClickShift = () => {
    const { to, from, receivingAddress } = this.props;
    const pair = `${from}_${to}`;

    this.props.fetchShift(receivingAddress, pair);
    this.props.trackEvent(
      'Shapeshift Exchange',
      'Input Valid Deposit Address'
    );
  }

  render() {
    const {
      classes,
      isFetching,
      coins
    } = this.props;

    if (isFetching) return <div>Loading..</div>;

    return (
      <div
        className={classNames(classes.container, {
          'mod-step2': !!this.props.depositAddress
        })}
      >
        {!this.props.depositAddress && <GetQuote coins={coins} />}
        {this.props.depositAddress && <Finalize coins={coins} />}
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    left: '10px',
    background: 'HSL(223, 21%, 20%)',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    borderRadius: '3px',
    backgroundColor: 'HSL(223, 21%, 20%)',
    backgroundImage: '-webkit-linear-gradient(-30deg, hsl(223, 21%, 20%) 50%, hsl(0, 0%, 100%) 50%)',
    '&.mod-step2': {
      backgroundImage: '-webkit-linear-gradient(-30deg, hsl(223, 21%, 20%) 60%, hsl(0, 0%, 100%) 60%)',
      boxShadow: '0px -3px 21px hsla(0, 0%, 0%, 1)'
    }
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

};

/* =============================================================================
=    GraphQL
============================================================================= */
const QUERY = gql`
  query exchange {
    shapeshiftCoins
  }
`;
const mapDataToProps = result => ({
  coins: result.data.shapeshiftCoins,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  props: mapDataToProps
});

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state: {exchange: ReduxState}) => ({
  from: state.exchange.from,
  to: state.exchange.to,
  depositAddress: state.exchange.depositAddress,
  receivingAddress: state.exchange.receivingAddress,
  isReceivingAddressValid: state.exchange.isReceivingAddressValid,
  orderId: state.exchange.orderId,
  orderStatus: state.exchange.orderStatus
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchLimit: pair => dispatch(fetchLimit(pair)),
  fetchShift: (receivingAddress, pair) =>
    dispatch(fetchShift(receivingAddress, pair, receivingAddress)),
  fetchOrderStatus: orderId => dispatch(fetchOrderStatus(orderId)),
  hideExchange: () => dispatch(hideExchange()),
  trackEvent: app.actions.trackEvent
});

export default compose(
  injectSheet(styles),
  withData,
  connect(mapStateToProps, mapDispatchToProps)
)(Exchange);
