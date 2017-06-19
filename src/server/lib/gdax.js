/* eslint-disable import/prefer-default-export */
export async function fetchTicker(ticker = 'ETH', getTime = false) {
  const url = `https://api.gdax.com/products/${ticker}-USD/ticker`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const { price, time } = json;

    if (getTime) {
      return { price, time };
    }

    return +price;
  } catch (err) {
    throw new Error(err.message);
  }
}
