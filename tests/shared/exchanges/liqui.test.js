import { expect } from 'chai';
import liqui from 'shared/lib/exchanges/liqui';

describe('Liqui API Integration', function () {

  this.timeout(10000);

  it('should support fetching listed pairs', async function () {
    const res = await liqui.fetchPairs();

    expect(res.eth_btc).to.exist;
  });

  it('should support fetching tickers', async function () {
    const res = await liqui.fetchTicker('eth_btc');

    expect(res).to.exist;
  });

  it('should support price map', async function () {
    const priceMap = await liqui.fetchBoundPriceMap();
    const eth_btc = priceMap.eth_btc;
    const price = await eth_btc();

    expect(price).to.be.a('number');
  });
});
