// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import type {
  $Quote, $Limit, ReduxState, Dispatch } from '~/exchange/types';
import ExchangeSelect from './ExchangeSelect';
import { fetchQuote, setAmount, requestQuote } from '../actions';

type Props = {
  classes: Object,
  which: 'SEND' | 'RECEIVE',
  inverted: boolean,
  isFetchingQuote: boolean,
  limit: $Limit,
  quote: $Quote,
  to: string,
  from: string,
  active: string,
  coins: Object,
  amount: number,
  onChangeAmount: (amount: number) => void,
  fetchQuote: (pair: string, amount: number) => void,
  requestQuote: (amount: number) => void,
  disableSelect: ?boolean
};

class GetQuoteColumn extends React.Component {
  props: Props;
  state = {
    isDropdownOpen: false
  };
  select: HTMLDivElement;

  handleChangeAmount = (event: SyntheticEvent & {target: HTMLInputElement}) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const { onChangeAmount, isFetchingQuote, from, to } = this.props;
    const NON_DIGITS = /[^\d.]/g;
    const amount = event.target.value.replace(NON_DIGITS, '');
    const pair = `${from}_${to}`;

    onChangeAmount(amount);

    if (+amount && !isFetchingQuote) {
       // Debouncing means that redux wont know we are fetching till later, so
       // fire the request action manually.
      this.props.requestQuote(+amount);
      debounce(this.props.fetchQuote, 500)(pair, +amount);
    }
  }

  handleClickSymbol = (event: SyntheticEvent & {nativeEvent: Event}) => {
    if (!(event.target instanceof Node)) return;
    if (!this.state.isDropdownOpen) {
      this.setState({ isDropdownOpen: true });
    } else {
      const clickedSelect = this.select.contains(event.target);

      if (!clickedSelect) {
        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
      }
    }
  }

  getQuotedRate() {
    const MAX_PRECISION = 6;
    const { quote, amount, isFetchingQuote } = this.props;

    if (isFetchingQuote) {
      return 'Getting Quote...';
    }

    if (quote && quote.quotedRate) {
      return parseFloat(quote.quotedRate * amount).toFixed(MAX_PRECISION);
    }

    return '-';
  }

  renderInput() {
    const {
      classes: c, inverted, amount, onChangeAmount
    } = this.props;

    if (inverted) {
      return (
        <input
          className={c.input}
          type="text"
          value={this.getQuotedRate()}
          disabled
        />
      );
    }

    return (
      <input
        className={c.input}
        type="text"
        placeholder="0.00"
        value={amount}
        onChange={this.handleChangeAmount}
        onFocus={() => onChangeAmount(amount)}
      />
    );
  }

  renderMeta() {
    const { classes: c, limit, quote, inverted, to, from } = this.props;

    if (inverted && quote && quote.quotedRate) {
      const rate = parseFloat(quote.quotedRate).toFixed(4);

      return (
        <div className={c.meta}>
          <span>Your Rate:{' '}</span>
          <strong>
            {`1 ${from} = ${rate} ${to}`}
          </strong>
        </div>
      );
    }
    return (
      <div className={c.meta}>
        <span>Min:{' '}</span>
        <strong>{limit && limit.min}</strong>
        &nbsp;&nbsp;&nbsp;
        <span>Max:{' '}</span>
        <strong>{limit && limit.limit}</strong>
      </div>
    );
  }

  renderSymbol() {
    const { active, coins, which, disableSelect, classes: c } = this.props;
    const coin = coins[active];
    const arrow = <i className="material-icons">keyboard_arrow_down</i>;

    return (
      <div
        className={c.symbol}
        onClick={!disableSelect && this.handleClickSymbol}
      >
        <img
          alt={coin.symbol}
          className={c.symbolImage}
          src={coin.imageSmall}
        />
        {coin.symbol}
        {!disableSelect && arrow}
        {!disableSelect && this.state.isDropdownOpen &&
          <ExchangeSelect
            which={which}
            onClose={() => this.setState({ isDropdownOpen: false })}
            inputRef={(ref) => { this.select = ref; }}
            type={which}
            coins={coins}
            active={active}
          />
        }
      </div>
    );
  }

  render() {
    const { inverted, classes: c } = this.props;

    return (
      <div className={classNames(c.column, inverted && 'mod-inverted')}>
        <div className={c.columnRow}>
          {this.renderInput()}
          {this.renderSymbol()}
        </div>
        {this.renderMeta()}
      </div>
    );
  }
}

const styles = {
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
  columnRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '5px',
    '.mod-inverted &': {
      justifyContent: 'flex-end',
    }
  },
  columnTitle: {
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex'
  },
  input: {
    display: 'inline-flex',
    background: 'none',
    border: 'none',
    overflow: 'hidden',
    textAlign: 'right',
    margin: '0 1px 0 0px',
    fontSize: '20px',
    color: 'hsl(0, 0%, 100%)',
    fontWeight: '200',
    outline: 'none',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)',
    maxWidth: 'calc(100% - 130px)',
    WebkitAppearance: 'none',
    '.mod-inverted &': {
      color: 'hsl(0, 0%, 20%)',
      borderBottom: 'none'
    }
  },
  symbol: {
    flex: '0 0 90px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    '& .material-icons': {
      fontSize: '14px'
    }
  },
  symbolImage: {
    maxWidth: '20px',
    maxHeight: '20px',
    marginRight: '3px',
    marginLeft: '10px'
  },
  meta: {
    fontSize: '10px',
    fontWeight: '300',
    alignSelf: 'flex-start',
    '.mod-inverted &': {
      alignSelf: 'flex-end'
    }
  }
};

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state: {exchange: ReduxState}, ownProps) => ({
  active: ownProps.which === 'from' ? state.exchange.from : state.exchange.to,
  inverted: ownProps.which === 'to',
  from: state.exchange.from,
  to: state.exchange.to,
  amount: state.exchange.amount,
  limit: state.exchange.limit,
  quote: state.exchange.quote,
  isFetchingQuote: state.exchange.isFetchingQuote
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeAmount: amount => dispatch(setAmount(amount)),
  fetchQuote: (pair, amount) => dispatch(fetchQuote(pair, +amount)),
  requestQuote: amount => dispatch(requestQuote(amount))
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(GetQuoteColumn);
