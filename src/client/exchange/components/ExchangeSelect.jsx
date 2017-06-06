// @flow
import type { Dispatch } from 'redux';
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import type { Action } from '~/exchange/types';
import { selectCoin } from '../actions';

type $Coin = {
  symbol: string
};

type Props = {
  classes: Object,
  coins: {
    [string]: $Coin
  },
  active: string,
  which: string,
  onSelect: (which: string, symbol: string) => void,
  onClose: () => void,
  inputRef: (c: HTMLDivElement) => void
};

class ExchangeSelect extends React.Component {
  props: Props;
  root: HTMLDivElement;

  componentDidMount() {
    document.addEventListener('click', this.handleClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument);
  }

  handleClickDocument = (event: Event) => {
    if (!(event.target instanceof Node)) {
      return;
    }
    if (!this.root.contains(event.target)) {
      this.props.onClose();
    }
  }

  render() {
    const { which, classes, coins, active, onSelect } = this.props;

    return (
      <div
        className={classes.container}
        ref={(c) => { this.root = c; this.props.inputRef(c); }}
      >
        {Object.values(coins).map((coin: $FlowTODO) => (
          <div
            key={coin.symbol}
            onClick={() => onSelect(coin.symbol, which)}
            className={classNames(classes.item, {
              'is-active': active === coin.symbol
            })}
          >
            {coin.symbol}
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    top: '-173px',
    color: 'hsl(0, 0%, 100%)',
    right: '0px',
    border: '1px solid hsl(0, 0%, 33%)',
    padding: '5px 0px',
    position: 'absolute',
    overflow: 'auto',
    fontSize: '12px',
    textAlign: 'right',
    maxHeight: '170px',
    boxShadow: '0px -2px 4px hsla(0, 0%, 0%, .3) inset',
    background: 'HSL(223, 21%, 20%)',
    fontWeight: '300',
    lineHeight: '1.9em',
    borderRadius: '3px'
  },
  item: {
    padding: '0 15px',
    '&:hover': {
      background: 'HSL(223, 21%, 25%)'
    },
    '&.is-active': {
      background: 'HSL(223, 21%, 25%)'
    }
  }
};

const withStyles = injectSheet(styles)(ExchangeSelect);

/* =============================================================================
=    Redux
============================================================================= */
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onSelectCoin: (which, symbol) => dispatch(selectCoin(which, symbol))
});

export default connect(null, mapDispatchToProps)(withStyles);
