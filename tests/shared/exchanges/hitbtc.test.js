import { expect } from 'chai';
import hitbtc from 'shared/lib/exchanges/hitbtc';

describe.only('HitBTC API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await hitbtc.fetchPairs();

    expect(res).not.to.be.empty;
  });

  it('should support fetching tickers', async function () {
    const res = await hitbtc.fetchTicker('BTCUSD');

    expect(res).not.to.be.empty;
  });

  it('should support price map', async function () {
    const priceMap = await hitbtc.fetchBoundPriceMap();
    const ETHBTC = priceMap.ETHBTC;
    const price = await ETHBTC();

    expect(price).to.be.a('number');
  });
});
