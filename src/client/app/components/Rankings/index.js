import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import app from 'app';
import Rankings from './Rankings';


/* =============================================================================
=  GraphQL: Get ICOs
============================================================================= */
const QUERY = gql`
  query icos {
    icos {
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
      is_erc20,
      eth_price_usd,
      btc_price_usd,
      supported_changelly,
      raise,
      amount_sold_in_ico
    }
  }
`;
const mapDataToProps = result => ({
  icos: result.data.icos,
  isFetching: result.data.loading
});
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const withData = graphql(QUERY, {
  props: mapDataToProps,
  options: {
    pollInterval: ONE_MINUTE
  }
});

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
const mapDispatchToProps = dispatch => ({
  toggleNav: () => dispatch(app.actions.toggleNav())
});
const withConnect = connect(null, mapDispatchToProps);

export default compose(withData, withActions, withConnect)(Rankings);
