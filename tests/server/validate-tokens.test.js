/**
 * Ensure that we can successfully fetch the necessary data for each token.
 */
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import { expect, assert } from 'chai';
import Token from 'server/models/Token';
import fetchTokens from './helpers/fetchTokens';
import getExchangeService from 'shared/lib/exchange.service';

const TEN_MINUTES = 1000 * 60 * 10;
const exchangeService = getExchangeService();
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Token validation', function () {
  // let tokens;
  this.timeout(TEN_MINUTES);

  // before(function(done) {
  //   fetchTokens().then(res => {
  //     tokens = res;
  //     done();
  //   })
  // });

  it(
    'should be possible to find each token\'s price on at least one exchange',
    async function () {
      try {
        const tokens = await fetchTokens();

        for (var i = 0; i < tokens.length; i++) {
          const token = tokens[i];

          const price = await exchangeService.fetchUSDPrice(token.symbol);

          expect(price).to.be.a('number');
        }
      } catch (e) {
        assert.ifError(e);
      }
    }
  );

  it('should be listed on coinmarketcap', async function () {
    try {
      const tokens = await fetchTokens();
      for (var i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        // coinmarketcap has a rate limit of 10 per minute, so wait 6 seconds
        // between each iteration.
        await wait(1000 * 6);

        const { ticker } = token;
        const url = `https://graphs.coinmarketcap.com/currencies/${ticker}/`;
        const res = await fetch(url);
        const json = await res.json();

        expect(json.price_usd).to.be.an('array');
      }

    } catch (e) {
      assert.ifError(e);
    }
  });
});
