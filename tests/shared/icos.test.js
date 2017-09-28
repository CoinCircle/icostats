import { expect } from 'chai';
import Token from 'server/models/Token';
import getExchangeService from 'shared/lib/exchange.service';

// NOTE these tests are slow. That's why they run conditionally.
if (process.env.TEST_ALL) {
  describe('ICO Listings', function () {
    this.timeout(60000);

    it('should all be supported by Exchange Service', async function () {
      const exchangeService = getExchangeService();
      const tokens = await Token.find().lean().exec();
      const symbols = tokens.map(ico => ico.symbol);
      const promises = symbols.map(s => exchangeService.fetchUSDPrice(s));
      const res = await Promise.all(promises);

      expect(res).not.to.include(null);
    });
  });
}
