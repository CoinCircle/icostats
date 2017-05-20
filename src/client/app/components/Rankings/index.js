import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
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
      rank,
      price_usd,
      price_btc,
      implied_token_price,
      change_since_ico,
      start_date,
      icon_ext
    }
  }
`;
const mapDataToProps = result => ({
  icos: result.data.icos,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  props: mapDataToProps
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

export default compose(withData, withActions)(Rankings);
