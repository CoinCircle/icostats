/**
 * Calculate the ROI given a start price and an end price.
 * @flow
 */
export default function ROI(a: number, b: number) {
  const isDecrease = b < a;
  const diff = isDecrease ? (a - b) : (b - a);
  const delta = diff / a;

  if (a === null || b === null) {
    return null;
  }

  return isDecrease ? (0 - delta) : delta;
}
