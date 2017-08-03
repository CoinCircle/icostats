// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Exchange from '~/exchange/components/Exchange';
import SearchInput from '~/app/components/SearchInput';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Filters from './Filters';
import Loading from './Loading';
import * as types from '../constants';
import CurrencyPicker from './CurrencyPicker';
import Paginator from './Paginator';
import { setSearchQuery } from '../actions';

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
  isExchangeActive: boolean,
  onChangeSearch: (val: string) => void,
  searchQuery: string
};


class Rankings extends React.Component {
  props: Props;
  state: $FlowTODO;
  debouncedOnChangeSearch: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      indexHighlighted: null,
      isSearchOpen: false
    };
  }

  handleSearch = (event: SyntheticEvent & { target: EventTarget }) => {
    this.props.onChangeSearch(event.target.value);
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
    const tooltip = (
      <span className={classes.searchTooltip}>
        Include multiple queries by separating them with `<em>|</em>`.<br />
        For example, `<pre>golem<em>|</em>status</pre>` would match both golem
        and status.
      </span>
    );
    const search = (
      <SearchInput
        className={classes.search}
        onChange={this.handleSearch}
        value={this.props.searchQuery}
        tooltip={tooltip}
      />
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
          {search}
        </div>
      </div>
    );
    const table = (
      <div className={classes.table}>
        <TableHeader
          sortBy={this.props.sortBy.replace('_abs', '')}
          onSort={(sortBy, ascending) => this.props.sort(sortBy, ascending)}
          ascending={this.props.ascending}
          view={view}
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
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  hamburger: {
    color: 'hsl(0, 0%, 75%)',
    paddingRight: '15px',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(0, 0%, 80%)'
    }
  },
  search: {
    marginTop: '5px',
    width: 'auto'
  },
  searchTooltip: {
    color: 'hsl(0, 0%, 102%)',
    fontSize: '10px',
    marginTop: '5px',
    '& em': {
      color: 'hsl(201, 87%, 54%)',
      fontWeight: 'bold',
      fontStyle: 'normal'
    },
    '& pre': {
      color: 'hsl(0, 0%, 100%)',
      display: 'inline'
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

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  searchQuery: state.rankings.searchQuery
});
const mapDispatchToProps = (dispatch: $FlowTODO) => ({
  onChangeSearch: val => dispatch(setSearchQuery(val))
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Rankings);

export default injectSheet(styles)(Container);
