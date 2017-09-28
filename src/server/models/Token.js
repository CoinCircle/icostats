const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenSchema = new Schema({

  /**
   * Readable ID that is manually assigned. The logo's name should match this.
   * Example: 'ethereum'
   */
  id: {
    type: String,
    unique: true,
    required: true
  },

  /**
   * Human-readable name
   * Example: 'Ethereum'
   */
  name: {
    type: String,
    required: true
  },

  /**
   * Symbol ås listed by exchanges
   * NOTE: Some coins have the same symbol, so we don't make this unique.
   * Example: 'ETH'
   */
  symbol: {
    type: String,
    required: true
  },

  /**
   * True if ERC-20
   */
  is_erc20: {
    type: Boolean,
    default: false
  },

  /**
   * If it's an ERC-20 token, define the contract address.
   * Example: '0x128739buh7983h3'
   */
  contract_address: {
    type: String
  },

  /**
   * Coinmarketcap ticker
   */
  ticker: {
    type: String,
    required: true
  },

  /**
   * USD price of ether when the ICO launched
   */
  eth_price_at_launch: {
    type: Number,
    required: true
  },

  /**
   * USD price of Bitcoin when the ICO launched
   */
  btc_price_at_launch: {
    type: Number,
    required: true
  },

  /**
   * How much was raised in USD
   */
  raise: {
    type: Number,
    required: true
  },


  /**
   * How many tokens were sold during the ICO
   */
  amount_sold_in_ico: {
    type: Number,
    required: true
  },

  /**
   * Start date of ICO
   */
  start_date: {
    type: Date,
    required: true,
    default: Date.now
  },

  /**
   * True if supported on changelly.com
   */
  supported_changelly: {
    type: Boolean,
    default: false
  },

  /**
   * If available, how much was raised in ETH/BTC
   */
  raise_by_currency: {
    btc: {
      type: Number
    },
    eth: {
      type: Number
    }
  },

  /**
   * URL to logo
   */
  image_url: {
    type: String,
    required: true
  }

});


module.exports = mongoose.model('Token', TokenSchema);

module.exports.TokenSchema = TokenSchema;
