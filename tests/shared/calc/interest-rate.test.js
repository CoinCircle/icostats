import { expect } from 'chai';
import range from 'lodash/range';
import calculateInterestRate from 'shared/lib/calc/interest-rate';

describe('Calculate Interest Rate', function () {
  it('should return the compounding interest rate given principal and final value', function () {
    // Simulate an initial investment of 1k which is now worth 5K after 5 weeks.
    // in this case, if we calculate the weekly interest correctly, that means
    // that we should be able to apply it to the initial investment 5 times and
    // end up with 5000.
    const initial = 1000;
    const final = 5000;
    const periods = 5;

    // Calculate the interest rate.
    const rate = calculateInterestRate(initial, final, periods);

    // Test accuracy by applying the rate to the initial value and see if it
    // actually gives us the final amount. A positive rate (e.g. 0.2) means a
    // 20% gains per period.
    const actual = range(periods).reduce(p => p + (p * rate), initial);

    // It won't be exact, so just check if it is accurate within 0.1%
    const difference = Math.abs(final - actual);
    const inaccuracy = difference / final;

    expect(inaccuracy).to.be.below(0.001);
  });

  it('should work for decreases in value', function () {
    const initial = 5000;
    const final = 1000;
    const periods = 5;
    const rate = calculateInterestRate(initial, final, periods);
    const actual = range(periods).reduce(p => p + (p * rate), initial);
    const difference = Math.abs(final - actual);
    const inaccuracy = difference / final;

    expect(inaccuracy).to.be.below(0.001);
  });
});
