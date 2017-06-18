/* eslint-disable camelcase */
import { expect } from 'chai';
import exchangeService, { EXCHANGES } from 'shared/lib/exchange.service';

describe('Exchange Service', function () {
  const FIVE_MINUTES = 1000 * 60 * 5;

  this.timeout(FIVE_MINUTES);

  before(async function () {
    this.exchangeService = exchangeService();
    await this.exchangeService.generatePricemap();
  });

  it('has a default', function () {
    expect(this.exchangeService.exchange).not.to.be.null;
  });

  it('is a singleton', function () {
    const copy = exchangeService();

    expect(copy).to.equal(this.exchangeService);
  });

  it('can set an exchange', function () {
    this.exchangeService.setExchange('BITTREX');

    expect(EXCHANGES.BITTREX).to.equal(this.exchangeService.exchange);
  });

  it('can fetch a map of pairs by exchange', async function () {
    const priceMapByExchange = await this.exchangeService.fetchBoundPriceMap();
    const polo = priceMapByExchange.POLONIEX;
    const fetchBTC_STRAT = polo.BTC_STRAT;
    const price = await fetchBTC_STRAT();

    expect(Object.keys(polo)).to.include('BTC_STRAT');
    expect(price).to.be.a('number');
  });

  it('can get a price fetcher for any pair', async function () {
    const fetcher = this.exchangeService.getPriceFetcherForPair('strat', 'btc');

    expect(fetcher).to.be.a('function');
  });

  it('can fetch price of a single pair in a versatile manner', async function () {
    const price = await this.exchangeService.fetchPrice('strat', 'btc');

    expect(price).to.be.a('number');
  });

  it('can fetch USD price of any symbol', async function () {
    const price = await this.exchangeService.fetchUSDPrice('STRAT');

    expect(price).to.be.a('number');
  });
});
