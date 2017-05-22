import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from 'app/components/App';
import appReducer from 'app/reducers';

/* =============================================================================
=    Redux
============================================================================= */
const client = new ApolloClient();
const reducer = combineReducers({
  app: appReducer,
  apollo: client.reducer()
});
const initialState = {};
const enhancer = compose(
  applyMiddleware(client.middleware()),
  (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
    window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);
const store = createStore(reducer, initialState, enhancer);

/* =============================================================================
=    Apollo
============================================================================= */
const app = (
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
);
const rootElement = document.getElementById('app');

ReactDOM.render(app, rootElement);
