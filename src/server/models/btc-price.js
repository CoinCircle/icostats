const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BtcPriceSchema = new Schema({

  usd_price: {
    type: Number,
    required: true
  },

  timestamp: {
    type: Date,
    required: true
  }
});


module.exports = mongoose.model('BtcPrice', BtcPriceSchema);
