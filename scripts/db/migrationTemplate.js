/* eslint-disable */
/**
 * NOTE before running migrations you must first build the models file by
 *      running `make build-models`
 */
const mongoose = require('mongoose');
const settings = require('../../settings.js');
const models = require('./models.js');

mongoose.connect(settings.MONGO_URI);

exports.migrate = function(client, done) {
	done();
};

exports.rollback = function(client, done) {
	done();
};
