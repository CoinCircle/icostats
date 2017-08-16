import { expect } from 'chai';
import etherdelta from 'shared/lib/exchanges/etherdelta';

describe.skip('EtherDelta API Integration', function () {
  const ONE_MINUTE = 60000;

  this.timeout(ONE_MINUTE);

  it('should support fetching listed pairs', async function () {
    const res = await etherdelta.fetchPairs();

    expect(res).not.to.be.empty;
  });

  it('should support fetching tickers', async function () {
    const TKN = '0xaaaf91d9b90df800df4f55c205fd6989c977e73a';
    const ETH = '0x0000000000000000000000000000000000000000';
    const res = await etherdelta.fetchTicker(TKN, ETH);

    expect(res).to.be.a('number');
  });

  it('should support price map', async function () {
    const priceMap = await etherdelta.fetchBoundPriceMap();
    const TKNETH = priceMap['TKN-ETH'];
    const price = await TKNETH();

    expect(price).to.be.a('number');
  });
});
