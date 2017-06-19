import { expect } from 'chai';
import coinmarketcap from 'shared/lib/coinmarketcap';

// NOTE these tests are slow. That's why they run conditionally.
if (process.env.TEST_ALL) {
  describe('Coinmarketcap API Integration', function () {
    this.timeout(2000000);

    it('should support fetching listed assets', async function () {
      const res = await coinmarketcap.fetchAssets();

      expect(res).to.include('ethereum');
    });

    it('should support fetching ticker', async function () {
      const price = await coinmarketcap.fetchTicker('ethereum', 'BTC');

      expect(price).to.be.a('number');
    });


    it('should return a bound price map', async function () {
      const map = await coinmarketcap.fetchBoundPriceMap();
      const fetcher = map['TKN-USD'];
      const price = await fetcher();

      expect(price).to.be.a('number');
    });
  });
}
