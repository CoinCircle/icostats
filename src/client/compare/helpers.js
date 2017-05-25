/* eslint-disable import/prefer-default-export */

export function getColors(n) {
  const MAX_HUE = 360;
  const delta = MAX_HUE / n;

  return Array(n).fill().map((v, i) => `hsl(${i * delta}, 100%, 60%)`);
}
