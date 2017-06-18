import { expect } from 'chai';
import cryptowatch from 'shared/lib/exchanges/cryptowatch';

describe('Cryptowat.ch API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await cryptowatch.fetchPairs();

    expect(res).not.to.be.null;
  });

  it('should support fetching tickers', async function () {
    const res = await cryptowatch.fetchTicker('eth', 'btc');

    expect(res).to.be.a('number');
  });
});
