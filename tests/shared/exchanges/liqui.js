import { expect } from 'chai';
import liqui from 'shared/lib/exchanges/liqui';

describe('Liqui API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await liqui.fetchPairs();

    expect(res.eth_btc).not.to.be.empty;
  });

  it('should support fetching tickers', async function () {
    const res = await liqui.fetchTicker('eth', 'btc');

    expect(res).not.to.be.empty;
  });

  it('should support price map', async function () {
    const priceMap = await liqui.fetchPrices();
    const eth_btc = priceMap.eth_btc;
    const price = await eth_btc();

    expect(price).to.be.a('number');
  });
});
