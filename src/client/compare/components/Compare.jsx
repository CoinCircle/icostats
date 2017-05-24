import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { getColors } from '~/compare/helpers';
import CompareSelector from './CompareSelector';
import ComparisonChart from './ComparisonChart';


const styles = {
  container: {
    padding: '15px'
  },
  title: {
    color: 'white',
    fontSize: '35px',
    fontWeight: 900
  }
};

@injectSheet(styles)
class Compare extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    prices: PropTypes.array,
    icos: PropTypes.array
  }
  static defaultProps = {
    isFetching: true,
    prices: [],
    icos: []
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (this.props.isFetching) return <span>Loading...</span>;
    const { classes, tickers } = this.props;
    const title = <h1 className={classes.title}>Compare ICOs</h1>;
    const colors = getColors(tickers.length + 1);

    return (
      <div className={classes.container}>
        {title}
        <CompareSelector
          colors={colors}
          items={this.props.icos}
          selected={tickers}
          onAdd={ticker => this.props.addTicker(ticker)}
          onRemove={ticker => this.props.onRemove(ticker)}
        />
        <ComparisonChart
          colors={colors}
          prices={this.props.prices}
        />
      </div>
    );
  }
}

/* =============================================================================
=  GraphQL: Get Data
============================================================================= */
const QUERY = gql`
  query getprices($tickers: [String!]) {
    prices(tickers: $tickers) {
      ticker
      price_usd
    }
    icos {
      ticker
      name
    }
  }
`;
const mapDataToProps = result => ({
  prices: result.data.prices,
  icos: result.data.icos,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  options: ({ tickers }) => ({ variables: { tickers }}),
  props: mapDataToProps
})(Compare);


/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = state => ({
  tickers: state.compare.tickers
});

export default connect(mapStateToProps)(withData);
