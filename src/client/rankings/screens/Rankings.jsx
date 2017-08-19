import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import app from 'app';
import Rankings from '../components/Rankings';
import * as selectors from '../selectors';
import { sort, setFilters, setCurrency } from '../actions';

/**
 * Fragment
 */
const ICOFragment = gql`
fragment ICOFragment on ICO {
  id,
  name,
  symbol,
  price_usd,
  price_btc,
  implied_token_price,
  roi_since_ico,
  roi_since_ico_eth,
  roi_since_ico_btc,
  start_date,
  icon_ext,
  ticker,
  eth_price_at_launch,
  btc_price_at_launch,
  roi_per_week,
  roi_per_day,
  roi_per_month,
  eth_roi_during_period,
  btc_roi_during_period,
  roi_vs_eth,
  roi_vs_btc,
  roi_vs_eth_abs,
  roi_vs_btc_abs,
  is_erc20,
  eth_price_usd,
  btc_price_usd,
  supported_changelly,
  raise,
  amount_sold_in_ico,
  supported_shapeshift
}
`;

/* =============================================================================
=  GraphQL: Get ICOs
============================================================================= */
const QUERY = gql`
  query icos {
    icos {
      ...ICOFragment
    }
    recentPrices {
      symbol
      recent_prices {
        day
        week
        month
      }
    }
  }
  ${ICOFragment}
`;
const SUBSCRIPTION_QUERY = gql`
  subscription icoPriceChanged {
    icoPriceChanged {
      ...ICOFragment
    }
  }
  ${ICOFragment}
`;
const mapDataToProps = result => ({
  icos: result.data.icos,
  recentPrices: result.data.recentPrices,
  isFetching: result.data.loading,
  subscribe: () => result.data.subscribeToMore({
    document: SUBSCRIPTION_QUERY,
    updateQuery: (prevResult, { subscriptionData }) => {
      const newIco = subscriptionData.data.icoPriceChanged;

      return {
        ...prevResult,
        icos: prevResult.icos.map(ico =>
          ico.id === newIco.id && newIco || ico
        )
      };
    }
  })
});
const withData = graphql(QUERY, {
  props: mapDataToProps
});

/* =============================================================================
=    Subscribe to updates
============================================================================= */


/* =============================================================================
=  GraphQL: Upvote
============================================================================= */
const ACTIONS = gql`
  mutation upvoteICO($id: String!) {
    upvoteICO(id: $id) {
      id
    }
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  upvoteICO: id => mutate({
    variables: { id },
    refetchQueries: ['icos']
  })
});
const withActions = graphql(ACTIONS, {
  props: mapActionsToProps
});

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state, ownProps) => ({
  view: selectors.selectView(state),
  sortBy: selectors.selectSortBy(state),
  ascending: state.rankings.ascending,
  icos: selectors.selectICOs(state, ownProps),
  filters: state.rankings.filters,
  currency: state.rankings.currency,
  maxPages: selectors.selectMaxPages(state, ownProps),
  isExchangeActive: state.exchange.isActive
});
const mapDispatchToProps = dispatch => ({
  toggleNav: () => dispatch(app.actions.toggleNav()),
  sort: (sortBy, ascending) => dispatch(sort(sortBy, ascending)),
  setFilters: filters => dispatch(setFilters(filters)),
  setCurrency: currency => dispatch(setCurrency(currency))
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withData, withActions, withConnect)(Rankings);
