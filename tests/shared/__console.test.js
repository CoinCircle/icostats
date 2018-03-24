/**
 * This has no real test. Its just used as a sort of REPL. Node console is not
 * ideal if you want to interact with the codebase because there is a lot of
 * syntax which is not supported in node REPL (like import statements and
 * async/await syntax).
 *
 * Usage:
 * 1. Change `describe.skip` to `describe.only` so only this file is evaluated
 *    by mocha.
 * 2. Run `make test`
 *
 * NOTE DO NOT COMMIT ANY CHANGES TO THIS FILE
 */
/* eslint-disable */
import { expect } from 'chai';
import getExchangeService from 'shared/lib/exchange.service';


describe.only('Console', function () {
  this.timeout(100000);
  it('Console', async function () {
    const exchangeService = getExchangeService();
    const price = await exchangeService.fetchUSDPrice('FUCK');

    console.log('price', price);

    expect(price).to.be.a('number');
  });
});
