import Gdax from 'gdax';
import Promise from 'bluebird';

const publicClient = new Gdax.PublicClient();

Promise.promisifyAll(publicClient);

publicClient.productID = 'ETH-USD';


/**
 * Get the price of ether on a certain date.
 * @param {String|Date}   date
 * @return {Promise}
 */
export async function fetchEthPriceAtDate(date) {
  const start = new Date(date);
  const end = new Date(`${date} 12:00`);

  const options = {
    start: start,
    end: end,
    granularity: 300
  };

  try {
    const data = await publicClient.getProductHistoricRatesAsync(options);
    const firstRow = data[1][0];
    const price = firstRow[1];

    return price;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function fetchCurrentEthPrice() {
  const data = await publicClient.getProductTickerAsync();
  const price = data[1].price;

  return +price;
}
