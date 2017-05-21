/* eslint-disable */
export default /* GraphQL */`

type ICO {
  id: String!
  name: String!
  symbol: String!
  rank: Int!
  price_usd: Float!
  price_btc: Float!
  volume_usd_24h: Float
  market_cap_usd: Float
  available_supply: Float
  total_supply: Float
  percent_change_1h: Float
  percent_change_24h: Float
  percent_change_7d: Float
  last_updated: Int!
  start_date: String
  implied_token_price: Float!
  eth_price_at_launch: Float!,
  btc_price_at_launch: Float!,
  roi_since_ico: Float!,
  roi_since_ico_eth: Float!,
  roi_since_ico_btc: Float!,
  icon_ext: String,
  ticker: String,
  roi_per_day: Float,
  roi_per_week: Float,
  roi_per_month: Float,
  eth_roi_during_period: Float,
  btc_roi_during_period: Float,
  roi_vs_eth: Float,
  roi_vs_btc: Float,
  is_erc20: Boolean,
  eth_price_usd: Float!,
  btc_price_usd: Float!
}

# the schema allows the following query:
type Query {
  icos: [ICO]
  ico(id: String!): ICO
}

# this schema allows the following mutation:
type Mutation {
  sendMail(name: String!, email: String!, message: String!): Boolean
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
