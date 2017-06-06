// @flow

export type $CoinMarketCapTicker = {
  ticker: string,
  price_usd: number, // raw response is string
  symbol: string
}

export type $ICO = {
  ticker: string,
  raise: number,
  implied_token_price: number,
  eth_price_at_launch: number,
  btc_price_at_launch: number,
  start_date: string
} & $CoinMarketCapTicker;
