/* eslint-disable import/prefer-default-export */

function changeSinceIco(ico) {
  const roi = +ico.price_usd / ico.implied_token_price;
  const diff = roi - 1;

  return diff;
}

/**
 * Normalize the coinmarketcap response
 * @param {Object} ico object as returned from coinmarketcap
 * @return {Object} Normalized object
 */
export const normalize = ico => ({
  ...ico,
  volume_usd_24h: ico['24h_volume_usd'],
  change_since_ico: changeSinceIco(ico)
});
