const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TickerSchema = new Schema({

  ticker: {
    unique: true,
    required: true,
    type: String
  },

  symbol: {
    type: String,
    required: true
  },

  price_usd: {
    type: Number,
    required: true
  },

  price_btc: {
    type: Number,
    required: true
  },

  timestamp: {
    type: Date,
    required: true
  },

  volume_usd_24h: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('Ticker', TickerSchema);
