/* eslint-disable */
import 'isomorphic-fetch';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import settings from 'settings';

mongoose.Promise = Promise;
mongoose.connect(settings.MONGO_TEST_URI);
const connection = mongoose.connection;

// =============================================================================
// Reset the database after every test.
// =============================================================================

before(function (done) {
  this.timeout(200000);
  connection.on('open', () => {
    connection.db.dropDatabase(done);
  });
});

after(done => {
  connection.db.dropDatabase(() => connection.close(done));
});

export default () => afterEach(done => connection.db.dropDatabase(done))
