/**
 * NOTE GDAX is used just for BTC/ETH prices.
 * @flow
 */
const baseUrl = 'https://api.gdax.com';

export async function fetchTicker(
  ticker: string = 'ETH',
  withTime: boolean = false
): Promise<number> {
  const url = `${baseUrl}/products/${ticker}-USD/ticker`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const { price, time } = json;

    if (withTime) {
      // $FlowFixMe
      return { price, time };
    }

    return +price;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const fetchETHPrice: () => Promise<number> = fetchTicker.bind(null, 'ETH', false);
export const fetchBTCPrice: () => Promise<number> = fetchTicker.bind(null, 'BTC', false);
