import { expect } from 'chai';
import poloniex from 'shared/lib/exchanges/poloniex';

describe('Poloniex API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await poloniex.fetchPairs();

    expect(res).not.to.be.empty;
  });

  it('should support fetching tickers', async function () {
    const res = await poloniex.fetchTicker('btc', 'eth');

    expect(res).not.to.be.empty;
  });

  it('should support price map', async function () {
    const priceMap = await poloniex.fetchBoundPriceMap();
    const BTC_STRAT = priceMap.BTC_STRAT;
    const price = await BTC_STRAT();

    expect(price).to.be.a('number');
  });
});
