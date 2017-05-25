const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({

  ticker: {
    type: String,
    unique: true
  },

  price_usd: {
    type: Array,
    required: true
  }
});


module.exports = mongoose.model('Price', PriceSchema);
