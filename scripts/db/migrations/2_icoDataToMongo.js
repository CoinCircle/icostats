/* eslint-disable */
/**
 * NOTE before running migrations you must first build the models file by
 *      running `make build-models`
 */
const mongoose = require('mongoose');
const moment = require('moment');
const settings = require('../../../settings.js');
const icos = require('../../../src/server/lib/ico-data.js');
const Token = require('../../../src/server/models/Token.js');

mongoose.Promise = Promise;
const db = mongoose.connect(settings.MONGO_URI, {
  useMongoClient: true
});

exports.migrate = function(client, done) {
	Token.insertMany(
		icos.map(ico => ({
			id: ico.id,
			name: ico.name,
			symbol: ico.symbol,
			is_erc20: ico.is_erc20,
			contract_address: ico.contract_address,
			ticker: ico.ticker,
			eth_price_at_launch: ico.eth_price_at_launch,
			btc_price_at_launch: ico.btc_price_at_launch,
			raise: ico.raise,
			amount_sold_in_ico: ico.amount_sold_in_ico,
			start_date: moment(ico.start_date, 'MM/DD/YYYY').toDate(),
			supported_changelly: ico.supported_changelly,
			raise_by_currency: ico.raise_by_currency,
			image_url: `${settings.S3_BASE_URL}/logos/${ico.id}.${ico.icon_ext || 'png'}`
		})),
		(err, docs) => {
			if (err) return console.log(err);

			done();
		});
};

exports.rollback = function(client, done) {
	done();
};
