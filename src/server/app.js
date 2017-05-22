/* eslint-disable no-console, newline-after-var, import/prefer-default-export */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import settings from 'settings';
import schema from 'schema';
import NodeCache from 'node-cache';
import morgan from 'morgan';
import initTickerWorker from 'lib/ticker-worker';

/**
 * Initialize the database.
 */
mongoose.connect(settings.MONGO_URI);

/**
 * Initialize the application.
 */
const app = module.exports = express();

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
 * HTTP logger
 */
app.use(morgan('tiny'));

/**
 * GraphQL
 */
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (process.env.NODE_ENV !== 'production') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));

/**
 * Byh default, serve our index.html file
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => {
  console.log(`App listening on port ${settings.APP_PORT}!`);
  initTickerWorker();
});
