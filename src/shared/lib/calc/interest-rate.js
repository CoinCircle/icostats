/**
 * Calculates the compound interest rate given a initial amount, final amount,
 * and the number of periods. For example, if I invest 1K and after 5 weeks it
 * is now worth 5K, I can calculate what my weekly gain is.
 *
 * @param {Number} a - Initial value
 * @param {Number} b - Final value
 * @param {Number} numPeriods - Number of periods to calculate the rate for.
 * @return The interest rate (or periodic ROI) in decimal.
 * @flow
 */
export default function calculateInterestRate(
  a: number,
  b: number,
  numPeriods: number
): number {
  const proportion = b / a;
  const rate = proportion ** (1 / numPeriods) - 1;

  return rate;
}
