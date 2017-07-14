/**
 * Calculate the relative difference of 2 numbers.
 *
 * This calculation is preferred to absolute difference in something like this:
 *
 * Assume we have:
 * ROI(a) = +1000%
 * ROI(b) = +1100%
 *
 * In this case, absolute diff is 100%, which makes it look like double the ROI
 *
 * Relative difference will instead return 10% which is more useful here.
 *
 * @flow
 */
export default function relativeDifference(a: number, b: number) {
  const isDecrease = b < a;
  const diff = isDecrease ? (a - b) : (b - a);
  const delta = Math.abs(diff / a);

  if (a === null || b === null) {
    return null;
  }

  return isDecrease ? (0 - delta) : delta;
}
