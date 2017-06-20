const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  price_usd: Number,
  timestamp: Number
}, { _id: false });

const PriceHistorySchema = new Schema({

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
