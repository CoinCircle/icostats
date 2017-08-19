/* eslint-disable */
/**
 * NOTE before running migrations you must first build the models file by
 *      running `make build-models`
 */
const Promise = require('bluebird');
const mongoose = require('mongoose');
const ProgressBar = require('progress');
const moment = require('moment');
const settings = require('../../../settings.js');
const models = require('../models.js');
const icoData = require('../../../src/server/lib/ico-data.js');

mongoose.Promise = Promise;
const db = mongoose.connect(settings.MONGO_URI, {
  useMongoClient: true
});

const PriceHistory = (models.PriceHistory.default || models.PriceHistory);
const Ticker = (models.Ticker.default || models.Ticker);
const TickerValueTypes = models.Ticker.ValueTypes;
const PriceUSDType = TickerValueTypes.PriceUSD;

exports.migrate = function(client, done) {
  var stream = PriceHistory.find({}, {}, { timeout: true }).cursor();
  var counter = 1;

  stream.addCursorFlag('noCursorTimeout', true);

  stream.on('data', function(doc) {
    stream.pause();

    var promises = [];
    var symbol = doc.symbol;
    var priceDocs = doc.prices;
    // Find the ICO
    var ico = icoData.find(function(el) {
      return el.symbol === symbol;
    });
    var ico_id = ico.id;

    console.log('Processing %s prices for ICO: %s', priceDocs.length, ico_id);

    var barPrefix = '#'+counter+' - '+ico_id+': ';
    var bar = new ProgressBar(barPrefix + ':bar :percent (ETA: :eta seconds)', {
      total: priceDocs.length
    });

    Promise.reduce(priceDocs, function(p, priceDoc) {
      return handlePriceDocAsync(priceDoc, ico_id).then(function() {
        bar.tick();
        delete db.models.PriceHistory;
        delete db.collections.pricehistories;
        delete db.base.modelSchemas.PriceHistory;
        return +p + 1;
      });
    }, 0).then(function() {
      counter++;
      stream.resume();
    });
  }).on('error', function(err) {
    console.log('ERROR:', error);
  }).on('close', function() {
    console.log('Finished migration');
    done();
  });
};

exports.rollback = function(client, done) {
	done();
};

function handlePriceDocAsync(priceDoc, ico_id) {
  var timestamp = priceDoc.timestamp;
  var price_usd = priceDoc.price_usd;
  var belongs_to = ico_id;
  var timestampMoment = moment(timestamp);
  // Get timestamp for start of hour
  var timestamp_hour = timestampMoment.clone().startOf('hour').valueOf();
  // build query to find ticker
  var query = {
    belongs_to: belongs_to,
    timestamp_hour: timestamp_hour,
    type: PriceUSDType
  };
  var options = {
    upsert: true
  };
  var minute = timestampMoment.minute();
  var second = timestampMoment.second();
  var key = 'values.' + minute + '.' + second;
  var update = {};
  update[key] = price_usd;

  return Ticker.findOne(query).exec().then(function(doc) {
    var ticker = doc;

    if (!ticker) {
      ticker = new Ticker();
    }

    ticker.set('belongs_to', belongs_to);
    ticker.set('timestamp_hour', timestamp_hour);
    ticker.set('type', PriceUSDType);
    ticker.values[minute][second] = price_usd;

    return ticker.save();
  })
}
