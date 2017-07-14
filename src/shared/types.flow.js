// @flow

export type $CoinMarketCapTicker = {
  ticker: string,
  price_usd: number, // raw response is string
  symbol: string
}

export type $Currency = 'USD' | 'ETH' | 'BTC';

export type $ICOData = {
  eth_price_at_launch: number,
  btc_price_at_launch: number,
  start_date: string,
  id: string,
  is_erc20: boolean,
  name: string,
  symbol: string,
  eth_price_at_launch: number,
  btc_price_at_launch: number,
  raise: number,
  amount_sold_in_ico: number,
  start_date: string,
  ticker: string,
  supported_changelly: boolean,
  icon_ext?: string,
  contract_address?: string
};

export type $ICOCalculations = {
  implied_token_price: number
};

export type $ICO =
  & $ICOData
  & $CoinMarketCapTicker
  & $ICOCalculations;
