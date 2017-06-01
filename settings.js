/* eslint-disable */
require('dotenv').config();

module.exports = {
  APP_ROOT: __dirname,
  APP_PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo/app',
  MONGO_TEST_URI: process.env.MONGO_TEST_URI || 'mongodb://mongo/app_test',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SHAPESHIFT_PUBLIC_KEY: '64701d2271bc6871bc0e01e3902dff2a08a5d7f42192e9c9252751a2962a6b0f9952838c130465f49d64b7a759b45eeebe0448fdd822e135cca83ee76cfbf27d'
};
