import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CompareSelector from './CompareSelector';


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

    return (
      <div className={classes.container}>
        {title}
        <CompareSelector
          items={this.props.icos}
          selected={tickers}
          onAdd={ticker => this.props.addTicker(ticker)}
          onRemove={ticker => this.props.onRemove(ticker)}
        />
        {this.props.prices.map(price => (
          <div key={price.ticker}>
            {price.ticker}: {price.price_usd.length} items
          </div>
        ))}
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
