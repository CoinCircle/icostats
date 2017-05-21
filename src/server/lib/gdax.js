/* eslint-disable import/prefer-default-export */
import EthPrice from 'models/eth-price';
import BtcPrice from 'models/btc-price';

export async function fetchCurrentPrice(ticker = 'ETH') {
  const url = `https://api.gdax.com/products/${ticker}-USD/ticker`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const { price, time } = json;

    /**
     * Save to db so for caching purposes.
     */
    if (price) {
      const Model = (ticker === 'ETH') ? EthPrice : BtcPrice;
      const doc = new Model({
        timestamp: new Date(time),
        usd_price: +price
      });

      await doc.save();
    }

    return +price;
  } catch (err) {
    throw new Error(err.message);
  }
}
