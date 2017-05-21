/* eslint-disable import/prefer-default-export */
import EthPrice from 'models/eth-price';

const TOO_MANY_REQUESTS = 429;

/**
 * Get the price of ether on a certain date. This is preferred for getting
 * prices from a long time ago, as other exchanges have not supported ETH for
 * as long as kraken.
 * @param {String|Date}   date
 * @return {Promise}
 */
export async function fetchEthPriceAtDate(date) {
  const unix = getUnixTime(date);
  const url = `https://api.cryptowat.ch/markets/kraken/ethusd/ohlc?before=${unix}`;

  try {
    const response = await fetch(url);

    if (response.status === TOO_MANY_REQUESTS) {
      throw new Error('Failed to get ETH price: Too many cryptowatch requests');
    }

    const json = await response.json();
    const result = json.result;
    const key = getLowestInterval(result);
    const data = result[key];
    const item = data[0];
    const unixTimestamp = item[0];
    const price = item[1];

    /**
     * Save to db so for caching purposes.
     */
    if (price) {
      const ethPrice = new EthPrice({
        timestamp: new Date(unixTimestamp * 1000), // eslint-disable-line
        usd_price: price
      });

      await ethPrice.save();
    }

    return data[0][1];
  } catch (err) {
    console.log('cryptowatch err: %s', err);
    throw new Error(err.message);
  }
}

function getLowestInterval(data) {
  const keys = Object.keys(data);
  const keysWithData = keys.filter(k => Array.isArray(data[k]));
  const lowest = keysWithData.reduce((p, c) => ((+c < +p) ? c : p));

  return lowest;
}

function getUnixTime(date) {
  const d = new Date(date);
  const ts = d.getTime();
  const MILLI = 1000;

  return Math.floor(ts / MILLI);
}
