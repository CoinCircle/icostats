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
  const end = new Date(`#{date} 12:00`);

  const options = {
    start: start,
    end: end,
    granularity: 300
  };
  console.log(date, start, end);
  try {
    const data = await publicClient.getProductHistoricRatesAsync(options);
    console.log(data);
    const firstRow = data[1][0];
    const price = firstRow[1];
    console.log(date, price);
    return price;
  } catch (err) {
    console.log(err.message);
  }
}
