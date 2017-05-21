import Gdax from 'gdax';
import Promise from 'bluebird';
import EthPrice from 'models/eth-price';

const publicClient = new Gdax.PublicClient();

Promise.promisifyAll(publicClient);
publicClient.productID = 'ETH-USD';

/**
 * Get the price of ether on a certain date.
 * @param {String|Date}   date
 * @return {Promise}
 */
export async function fetchEthPriceAtDate(date) {
  const unix = getUnixTime(date);
  const url = `https://api.cryptowat.ch/markets/kraken/ethusd/ohlc?before=${unix}`;

  try {
    const response = await fetch(url);
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
    throw new Error(err.message);
  }
}

function getLowestInterval(data) {
  const keys = Object.keys(data);
  const keysWithData = keys.filter(k => Array.isArray(data[k]));
  const lowest = keysWithData.reduce((p, c) => ((+c < +p) ? c : p));

  return lowest;
}


export async function fetchCurrentEthPrice() {
  const data = await fetchEthPriceAtDate(new Date());

  return data;
}

function getUnixTime(date) {
  const d = new Date(date);
  const ts = d.getTime();
  const MILLI = 1000;

  return Math.floor(ts / MILLI);
}
