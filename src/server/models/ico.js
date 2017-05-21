const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ICOSchema = new Schema({

  /**
   * name
   */
  name: {
    type: String,
    required: true
  },

  /**
   * Slug for urls and readable ID.
   */
  slug: {
    type: String,
    unique: true,
    required: true
  },

  /**
   * Is it an ERC-20 token?
   */
  is_erc20: {
    type: Boolean,
    required: true,
    default: false
  },

  /**
   * Etherscan contract address
   */
  contract_address: {
    type: String
  },

  /**
   * logo filename
   */
  logo_filename: {
    type: String
  },

  /**
   * USD raised in ICO
   */

});


module.exports = mongoose.model('ICO', ICOSchema);
