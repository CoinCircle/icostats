/**
 * Ensure that we can successfully fetch the necessary data for each token.
 */
import fetch from 'isomorphic-fetch';
import { expect, assert } from 'chai';
import tokens from 'server/lib/ico-data.js';
import getExchangeService from 'shared/lib/exchange.service';

const TEN_SECONDS = 1000 * 10;
const exchangeService = getExchangeService();

describe.only('Token validation', function () {

  this.timeout(TEN_SECONDS);

  tokens.forEach(token => {
    describe(`${token.name}`, function () {
      it('contains a unique ID', function () {
        const withSameId = tokens.filter(t => t.id === token.id);

        expect(withSameId.length).to.equal(1);
      });

      it(
        'should be possible to find its price on at least one exchange',
      async function () {
        try {
          const price = await exchangeService.fetchUSDPrice(token.symbol);

          expect(price).to.be.a('number');
        } catch (e) {
          assert.ifError(e);
        }
      });

      it('should be listed on coinmarketcap', async function () {
        try {
          const { ticker } = token;
          const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`

          const res = await fetch(url);
          const json = await res.json();

          expect(json.price_usd).to.be.an('array');
        } catch (e) {
          assert.ifError(e);
        }
      });
    });
  })
});
