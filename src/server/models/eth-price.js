const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EthPrice = new Schema({

  usd_price: {
    type: Number,
    required: true
  },

  timestamp: {
    type: Date,
    required: true
  }
});


module.exports = mongoose.model('EthPrice', EthPrice);
