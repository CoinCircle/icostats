// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import Exchange from '~/exchange/components/Exchange';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Filters from './Filters';
import Loading from './Loading';
import * as types from '../constants';
import CurrencyPicker from './CurrencyPicker';
import Paginator from './Paginator';

type ICO = {
  id: string
}

type Props = {
  classes: Object,
  isFetching: boolean,
  icos: ICO[],
  view: string,
  sortBy: string,
  ascending: boolean,
  currency: string,
  toggleNav: () => void,
  sort: (sortBy: string, ascending: boolean) => void,
  maxPages: number,
  isExchangeActive: boolean
};


class Rankings extends React.Component {
  props: Props;
  state: $FlowTODO;

  constructor(props: Props) {
    super(props);

    this.state = {
      indexHighlighted: null
    };
  }

  render() {
    if (this.props.isFetching) return <Loading />;
    const { classes, view } = this.props;
    const showCurrencyPicker = view !== types.ROI_VS_ETH
      && view !== types.ROI_VS_BTC;
    const titles = {
      [types.RECENT_PERFORMANCE]: 'Recent Performers',
      [types.ROI_OVER_TIME]: 'ROI Over Time',
      [types.ROI_TOTAL]: 'ROI Since ICO',
      [types.ROI_VS_ETH]: 'Compare Performance to Ethereum',
      [types.ROI_VS_BTC]: 'Compare Performance to Bitcoin'
    };
    const title = (
      <h3 className={classes.title}>
        {titles[view]}
      </h3>
    );
    const hamburger = (
      <i
        className={classNames('material-icons', classes.hamburger)}
        onClick={this.props.toggleNav}
      >
        menu
      </i>
    );
    const header = (
      <div className={classes.header}>
        {hamburger}
        <div className={classes.headerLeft}>
          {title}
          <Filters />
        </div>
        <div className={classes.headerRight}>
          {showCurrencyPicker && <CurrencyPicker />}
        </div>
      </div>
    );
    const table = (
      <div className={classes.table}>
        <TableHeader
          sortBy={this.props.sortBy}
          onSort={(sortBy, ascending) => this.props.sort(sortBy, ascending)}
          ascending={this.props.ascending}
          type={view}
          currency={this.props.currency}
        />
        <div className={classes.tbody}>
          {this.props.icos.map(ico => (
            <TableRow
              key={ico.id}
              ico={ico}
              type={view}
              currency={this.props.currency}
              onTouchStart={() => this.setState({ indexHighlighted: ico.id })}
              active={this.state.indexHighlighted === ico.id}
            />
          ))}
        </div>
      </div>
    );

    return (
      <div className={classes.container}>
        {header}
        {table}
        <Paginator max={this.props.maxPages} />
        {this.props.isExchangeActive && <Exchange />}
      </div>
    );
  }
}

const styles = {
  container: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  ico: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 900,
    fontSize: '19px',
    color: 'white',
    textTransform: 'uppercase',
    margin: '0',
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    padding: '15px',
    flex: '0 0 120px',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  table: {
    overflowX: 'auto',
    display: 'flex',
    paddingTop: '22px',
    flexDirection: 'column',
    width: '100%',
    WebkitOverflowScrolling: 'touch',
    flexGrow: 2
  },
  tbody: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowY: 'scroll',
    flexGrow: '2',
    overflowX: 'hidden',
    width: '180%',
    margin: '0 15px'
  },
  headerLeft: {
    flexGrow: 2
  },
  headerRight: {},
  hamburger: {
    color: 'hsl(0, 0%, 75%)',
    paddingRight: '15px',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(0, 0%, 80%)'
    }
  },
  '@media (min-width: 768px)': {
    tbody: {
      boxShadow: 'none',
      overflow: 'auto',
      width: 'auto'
    },
    header: {
      flex: '0 0 100px'
    }
  }
};

export default injectSheet(styles)(Rankings);
