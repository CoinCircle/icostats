// @flow
import type { Dispatch } from 'redux';
import React from 'react';
import injectSheet from 'react-jss';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import classNames from 'classnames';
import app from '~/app';
import { getColors } from '~/compare/helpers';
import CompareSelector from './CompareSelector';
import ComparisonChart from './ComparisonChart';
import Earn from '~/app/components/Earn';

type Props = {
  prices: Array<Object>,
  icos: Array<Object>,
  tickers: Array<string>,
  classes: Object,
  addTicker: Function,
  onRemove: Function,
  toggleNav: Function,
  isFetching: boolean
};

class Compare extends React.Component {
  props: Props;
  static defaultProps = {
    isFetching: true,
    prices: [],
    icos: []
  }

  render() {
    const { classes, tickers } = this.props;
    const colors = getColors(tickers.length);
    const hamburger = (
      <i
        className={classNames('material-icons', classes.hamburger)}
        onClick={this.props.toggleNav}
      >
        menu
      </i>
    );

    return (
      <div className={classes.bg}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            {hamburger}
            Compare ICOs (Beta)
          </h1>
          <CompareSelector
            loading={this.props.isFetching}
            colors={colors}
            items={this.props.icos}
            selected={tickers}
            onAdd={ticker => this.props.addTicker(ticker)}
            onRemove={ticker => this.props.onRemove(ticker)}
          />
          <ComparisonChart
            colors={colors}
            prices={this.props.prices}
            tickers={this.props.tickers}
          />
        </div>
        <Earn />
      </div>
    );
  }
}

const QUERY = gql`
query geticos {
  icos {
    ticker
    name
  }
}
`;
const mapDataToProps = result => ({
  icos: result.data.icos,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  props: mapDataToProps
})(Compare);

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  tickers: state.compare.tickers
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleNav: () => dispatch(app.actions.toggleNav())
});
const container = connect(mapStateToProps, mapDispatchToProps)(withData);

/* =============================================================================
=    Stylesheet
============================================================================= */
const styles = {
  bg: {
    width: '100%',
    flexGrow: '2',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flexGrow: '2',
    padding: '15px 40px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: '30px',
    fontWeight: 900
  },
  hamburger: {
    color: 'hsl(0, 0%, 75%)',
    paddingRight: '15px',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(0, 0%, 80%)'
    }
  },
};

export default injectSheet(styles)(container);
