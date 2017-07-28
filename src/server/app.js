/* eslint-disable no-console, newline-after-var, import/prefer-default-export,
no-multi-assign */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-loggly-bulk';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import OpticsAgent from 'optics-agent';
import settings from 'settings';
import schema from 'schema';
import NodeCache from 'node-cache';
import initTickerWorker from 'lib/ticker-worker';
import initPriceWorker from '~/lib/price-worker';
import initGraphWorker from '~/lib/graph-worker';

/**
 * Initialize the database.
 */
mongoose.connect(settings.MONGO_URI);
mongoose.Promise = Promise;

/**
 * Initialize the application.
 */
const app = module.exports = express();

/**
 * Tell nginx to read the X-Forwarded-For header for logging IP addresses which
 * will contain the real IP.
 */
app.enable('trust proxy');

/**
 * Initialize a cache.
 */
const appCache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120
});
export const cache = appCache;

/**
 * Support json & urlencoded requests.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Setup logging
 */
winston.add(winston.transports.Loggly, {
  inputToken: settings.LOGGLY_TOKEN,
  subdomain: settings.LOGGLY_SUBDOMAIN,
  tags: ['Winston-NodeJS', settings.LOGGLY_TAG],
  json: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  exitOnError: false
});

if (!settings.DEBUG) {
  app.use(expressWinston.logger({
    winstonInstance: winston
  }));
}

/**
 * Add optics to graphql
 */
OpticsAgent.configureAgent({ apiKey: settings.OPTICS_API_KEY });
OpticsAgent.instrumentSchema(schema);
app.use(OpticsAgent.middleware());

/**
 * GraphQL
 */
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    opticsContext: OpticsAgent.context(req)
  }
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));

/**
 * Byh default, serve our index.html file
 */
app.get('*', (req, res) =>
  res.sendFile(`${settings.APP_ROOT}/public/index.html`)
);

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => {
  console.log(`App listening on port ${settings.APP_PORT}!`);
  initTickerWorker();
  initPriceWorker();
  initGraphWorker();
});


/**
 * Handle errors
 */
app.use(expressWinston.errorLogger({
  winstonInstance: winston
}));
