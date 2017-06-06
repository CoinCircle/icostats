/* eslint-disable */
const settingsPublic = require('./settings-public.js');
require('dotenv').config();

module.exports = Object.assign({}, settingsPublic, {
  APP_ROOT: __dirname,
  APP_PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo/app',
  MONGO_TEST_URI: process.env.MONGO_TEST_URI || 'mongodb://mongo/app_test',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SHAPESHIFT_SECRET: process.env.SHAPESHIFT_SECRET,
  LOGGLY_SUBDOMAIN: 'icostats',
  LOGGLY_TOKEN: '8b807190-29c8-4a5b-adfb-cfe5621fe18b',
  LOGGLY_TAG: process.env.LOGGLY_TAG || 'development'
});
