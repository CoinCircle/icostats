import * as mongoose from 'mongoose';
import * as lodash from 'lodash';

export enum ValueTypes {
  PriceUSD = 0,
  PriceBTC = 1,
  PriceETH = 2
}

export interface ITicker extends mongoose.Document {
  belongs_to: String;
  timestamp_hour: Date;
  type: ValueTypes;
  values: {
    [minute: number]: {
      [second: number]: number
    }
  }
}


const TickerSchema = new mongoose.Schema({

  belongs_to: {
    type: String,
    required: true
  },

  timestamp_hour: {
    type: Date,
    required: true,
    index: true
  },

  type: {
    type: String,
    enum: [ValueTypes.PriceUSD, ValueTypes.PriceBTC, ValueTypes.PriceETH],
    required: true
  },

  values: {
    type: mongoose.Schema.Types.Mixed,
    validate(obj) {
      const keys = Object.keys(obj).map(v => parseInt(v));
      const isHourKeysValid = keys.every(k => (k >= 0) && (k <= 59));
      // Only validating root keys for performance.

      return isHourKeysValid;
    },
    default: getDefaultValues
  }
});

TickerSchema.index({ timestamp_hour: -1 });

export default mongoose.model<ITicker>('Ticker', TickerSchema);

/**
 * Builds an object to represent an hour's worth of data that looks like this:
 *
 * {
 *   0: { 0: 0, 1: 0, …, 59: 0 },
 *   1: { 0: 0, 1: 0, …, 59: 0 },
 *   …,
 *   58: { 0: 0, 1: 0, …, 59: 0 },
 *   59: { 0: 0, 1: 0, …, 59: 0 }
 * }
 *
 * The keys on the root represent a minute, and the keys on the nested object
 * represent seconds. This allows us to store an hour of data in such a way
 * that it is efficient to read and write to.
 */
function getDefaultValues() {
  const sixty = lodash.range(60);

  return sixty.reduce((obj, c) => ({
    ...obj,
    [c]: sixty.reduce((objj, cc) => ({
      ...objj,
      [cc]: 0
    }), {})
  }), {});
}
