/* eslint-disable camelcase */
export default function merge(coinmarketcapPrices, priceHistory) {
  const res = [...coinmarketcapPrices];

  for (let i = 0; i < priceHistory.length; i++) {
    const { symbol, prices } = priceHistory[i];
    const exists = res.some(el => el.symbol === symbol);

    if (!exists) {
      const item = {
        symbol,
        price_usd: prices.map(
          ({ price_usd, timestamp }) => [timestamp, price_usd]
        )
      };

      res.push(item);
    }
  }

  return res;
}
