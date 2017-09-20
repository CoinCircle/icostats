/* eslint-disable */
const path = require('path');
const settingsPublic = require('./settings-public.js');
let ROOT_DIR;

if (typeof ROOT_DIR === 'undefined') {
  ROOT_DIR = null;
}

const __ROOT_DIR__ = process.env.ROOT_DIR || ROOT_DIR || process.cwd();
const ENV_FILE_PATH = path.resolve(__ROOT_DIR__, '.env');

require('dotenv').config({ path: ENV_FILE_PATH });

module.exports = Object.assign({}, settingsPublic, {
  APP_ROOT: __ROOT_DIR__,
  ROOT_DIR: __ROOT_DIR__,
  APP_PORT: process.env.PORT || 3000,
  DEBUG: isDebug(),
  PROMISE_CONCURRENCY: parseInt(process.env.PROMISE_CONCURRENCY || 1),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo/app',
  MONGO_TEST_URI: process.env.MONGO_TEST_URI || 'mongodb://mongo/app_test',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URI: process.env.REDIS_URI || 'redis://redis:6379/0',
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SHAPESHIFT_SECRET: process.env.SHAPESHIFT_SECRET,
  LOGGLY_SUBDOMAIN: 'icostats',
  LOGGLY_TOKEN: '8b807190-29c8-4a5b-adfb-cfe5621fe18b',
  LOGGLY_TAG: process.env.LOGGLY_TAG || 'development',
  OPTICS_API_KEY: process.env.OPTICS_API_KEY || 'service:icostats-dev:UZPcus12V1nCychIBLloUA'
});

function isDebug() {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  if (typeof process.env.DEBUG !== 'undefined') {
    return !!process.env.DEBUG;
  }

  return true;
}
