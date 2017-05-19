/* eslint-disable */
require('dotenv').config();

module.exports = {
    APP_ROOT: __dirname,
    APP_PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo/app',
    MONGO_TEST_URI: process.env.MONGO_TEST_URI || 'mongodb://mongo/app_test'
};
