/* eslint-disable */
import { expect, assert } from 'chai';
import * as shapeshift from 'shared/lib/shapeshift';

describe('Shapeshift API Integration', function () {

  describe('Get Coins', function () {
    it('returns the available coins', async function () {
      const coins = await shapeshift.getCoins();

      expect(coins).to.include.keys('ETH');
    });
  });

  describe('description', function () {

  });
});;
