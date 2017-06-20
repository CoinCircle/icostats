import { expect } from 'chai';
import bittrex from 'shared/lib/exchanges/bittrex';

describe('Bittrex API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await bittrex.fetchPairs();

    expect(res).to.include('BTC-ETH');
  });

  it('should support fetching tickers', async function () {
    const res = await bittrex.fetchTicker('BTC-BAT');

    expect(res).to.be.a('number');
  });
});
