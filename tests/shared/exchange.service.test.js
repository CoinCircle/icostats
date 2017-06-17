import { expect } from 'chai';
import exchangeService, { EXCHANGES } from 'shared/lib/exchange.service';

// TODO ONLY
describe.only('Exchange Service', function () {
  beforeEach(function () {
    this.exchangeService = exchangeService();
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

  it('can fetch all possible pairs', async function () {
    const priceMap = await this.exchangeService.fetchPrices();
    const fetchTKNBTC = priceMap.tkn_btc;
    const TKNBTC = await fetchTKNBTC();

    expect(Object.keys(priceMap)).to.include('tkn_btc');
    expect(TKNBTC).to.be.a('number');
  });

  it('can fetch price of a single pair in a versatile manner', async function () {
    const price = await this.exchangeService.fetchPrice('eth', 'usd');

    expect(price).to.be.a('number');
  });

  it('can fetch USD price of any symbol', async function () {
    const price = await this.exchangeService.fetchUSDPrice('PTOY');

    expect(price).to.be.a('number');
  });
});
