import * as mongoose from 'mongoose';

export interface IPriceHistory extends mongoose.Document {
  symbol: string;
}

const PriceSchema = new mongoose.Schema({
  price_usd: Number,
  timestamp: Number
}, { _id: false });

const PriceHistorySchema = new mongoose.Schema({

  symbol: {
    type: String,
    unique: true
  },

  prices: {
    type: [PriceSchema],
    default: []
  },

  // This will cache the latest price, so we dont need to iterate the whole
  // history when we just want to get the current price.
  latest: {
    type: PriceSchema,
    default: {}
  }
});


module.exports = mongoose.model('PriceHistory', PriceHistorySchema);
