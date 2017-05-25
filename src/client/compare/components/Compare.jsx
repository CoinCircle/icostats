// @flow
import React from 'react';
import injectSheet from 'react-jss';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { getColors } from '~/compare/helpers';
import CompareSelector from './CompareSelector';
import ComparisonChart from './ComparisonChart';

type Props = {
  prices: Array<Object>,
  icos: Array<Object>,
  tickers: Array<string>,
  classes: Object,
  addTicker: Function,
  onRemove: Function
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
    const colors = getColors(tickers.length + 1);

    return (
      <div className={classes.container}>
        <h1 className={classes.title}>
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
const container = connect(mapStateToProps)(withData);

/* =============================================================================
=    Stylesheet
============================================================================= */
const styles = {
  container: {
    padding: '15px 40px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: '35px',
    fontWeight: 900
  }
};

export default injectSheet(styles)(container);
