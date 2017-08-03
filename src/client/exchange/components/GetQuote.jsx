// @flow
import type { Dispatch } from 'redux';
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import type { Action, ReduxState } from '~/exchange/types';
import CheckIcon from '~/app/components/CheckIcon';
import GetQuoteColumn from './GetQuoteColumn';
import PoweredByShapeshift from './PoweredByShapeshift';
import { fetchAddresses, fetchValidateAddress, setReceivingAddress } from '../actions';

type Props = {
  classes: Object,
  coins: Object,
  addresses: Array<string>,
  isFetchingAddresses: boolean,
  fetchAddresses: () => void,
  receivingAddress: string,
  isReceivingAddressValid: boolean,
  setReceivingAddress: (address: string) => void,
  isFetchingValidateAddress: boolean,
  fetchValidateAddress: (address: string, to: string) => void,
  to: string
};

class GetQuote extends React.Component {
  props: Props;

  async componentWillMount() {
    this.props.fetchAddresses();
  }

  handleChangeReceivingAddress = (event) => {
    event.persist();
    const address = event.target.value;
    const { to } = this.props;

    this.props.setReceivingAddress(address);

    if (
      address &&
      !this.props.isFetchingValidateAddress &&
      !this.props.isFetchingAddresses
    ) {
      debounce(this.props.fetchValidateAddress, 300)(address, to);
    }
  }

  render() {
    const {
      addresses,
      classes: c, coins, receivingAddress, isReceivingAddressValid
    } = this.props;
    const title = (
      <div className={c.title}>
        <div>
          Amount To Send
        </div>
        <div>
          You&apos;ll Receive
        </div>
      </div>
    );
    const arrow = (
      <i
        className={classNames('material-icons', c.iconArrow)}
      >arrow_forward</i>
    );
    const body = (
      <div className={c.body}>
        <GetQuoteColumn which="from" coins={coins} />
        {arrow}
        <GetQuoteColumn which="to" coins={coins} />
      </div>
    );
    const footer = (
      <div className={c.footer}>
        <PoweredByShapeshift />
        <input
          list={'receiving-address'}
          value={receivingAddress}
          spellCheck={false}
          placeholder="Input receiving address"
          onChange={this.handleChangeReceivingAddress}
          className={classNames(c.inputReceiving, {
            'is-valid': isReceivingAddressValid,
            'is-invalid': isReceivingAddressValid === false
          })}
        />
        <datalist id={'receiving-address'}>{addresses.map(address => (
          <option key={address}>
            {address}
          </option>
        ))}</datalist>
        {isReceivingAddressValid && <CheckIcon />}
      </div>
    );

    return (
      <div className={c.container}>
        {title}
        {body}
        {footer}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2
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
  iconArrow: {
    color: 'hsl(0, 0%, 18%)',
    fontSize: '30px',
    background: 'hsl(0, 0%, 98%)',
    borderRadius: '100%',
    border: '1px solid hsl(0, 0%, 76%)',
    padding: '3px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 2
  },
  inputReceiving: {
    color: 'hsl(0, 0%, 30%)',
    border: 'none',
    margin: '0 17px',
    display: 'inline-flex',
    outline: 'none',
    fontSize: '12px',
    textAlign: 'right',
    fontWeight: '500',
    WebkitAppearance: 'none',
    background: 'none',
    borderRadius: '3px',
    padding: '4px 0',
    width: '45%',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid hsl(0, 0%, 84%)',
    alignSelf: 'flex-end',
    '&.is-valid': {
      borderColor: 'hsl(112, 95%, 42%)'
    },
    '&.is-invalid': {
      borderColor: 'hsl(0, 95%, 42%)'
    }
  },
};

const styled = injectSheet(styles)(GetQuote);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state: {exchange: ReduxState}) => ({
  to: state.exchange.to,
  addresses: state.exchange.addresses,
  receivingAddress: state.exchange.receivingAddress,
  isReceivingAddressValid: state.exchange.isReceivingAddressValid
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchAddresses: () => dispatch(fetchAddresses()),
  setReceivingAddress: address => dispatch(setReceivingAddress(address)),
  fetchValidateAddress: (address, symbol) =>
    dispatch(fetchValidateAddress(address, symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(styled);
