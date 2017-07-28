/* eslint-disable */
import GraphQLJSON from 'graphql-type-json';

export default /* GraphQL */`

scalar JSON

type ICO {
  id: String!
  name: String!
  symbol: String!
  price_usd: Float!
  price_btc: Float
  market_cap_usd: Float
  available_supply: Float
  total_supply: Float
  percent_change_1h: Float
  percent_change_24h: Float
  percent_change_7d: Float
  last_updated: Int!
  start_date: String
  implied_token_price: Float!
  eth_price_at_launch: Float!
  btc_price_at_launch: Float!
  roi_since_ico: Float!
  roi_since_ico_eth: Float!
  roi_since_ico_btc: Float!
  icon_ext: String
  ticker: String
  roi_per_day: Float
  roi_per_week: Float
  roi_per_month: Float
  eth_roi_during_period: Float
  btc_roi_during_period: Float
  roi_vs_eth: Float
  roi_vs_btc: Float
  roi_vs_eth_abs: Float
  roi_vs_btc_abs: Float
  is_erc20: Boolean
  eth_price_usd: Float!
  btc_price_usd: Float!
  supported_changelly: Boolean
  raise: Float!
  amount_sold_in_ico: Float!
  supported_shapeshift: Boolean
}

type Price {
  price_usd: [[ Float ]]
  ticker: String
}

type RecentPriceItem {
  week: Float
  day: Float
  month: Float
}
type RecentPrice {
  symbol: String
  recent_prices: RecentPriceItem
}


# the schema allows the following query:
type Query {
  icos: [ICO]
  ico(id: String!): ICO
  prices(tickers: [String!]): [Price]
  recentPrices: [RecentPrice]
  shapeshiftCoins: JSON
  getPrice(a: String, b: String): Float
}

# this schema allows the following mutation:
type Mutation {
  sendMail(
    name: String!,
    email: String!,
    message: String!,
    subject: String
  ): Boolean

# ==============================================================================
# Subscription
# ==============================================================================
type Subscription {
  icoPriceChanged: ICO
}

# ==============================================================================
# Root
# ==============================================================================
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
