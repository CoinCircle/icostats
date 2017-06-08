/**
 * Calculate the absolute difference of 2 numbers.
 * @flow
 */
export default function absoluteDifference(a: number, b: number) {
  const isDecrease = b < a;
  const diff = isDecrease ? (a - b) : (b - a);

  return isDecrease ? (0 - diff) : diff;
}
