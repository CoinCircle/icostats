import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import ApolloClient from 'apollo-client';
import thunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';
import App from 'app/components/App';
import appReducer from 'app/reducers';
import compareReducer from 'compare/reducers';
import rankingsReducer from '~/rankings/reducers';
import exchangeReducer from '~/exchange/reducers';


// eslint-disable-next-line
export const history = createHistory();

/* =============================================================================
=    Redux
============================================================================= */
const client = new ApolloClient();
const reducer = combineReducers({
  app: appReducer,
  compare: compareReducer,
  apollo: client.reducer(),
  router: routerReducer,
  rankings: rankingsReducer,
  exchange: exchangeReducer
});
const initialState = {};
const enhancer = compose(
  applyMiddleware(
    client.middleware(),
    routerMiddleware(history),
    thunk
  ),
  // eslint-disable-next-line
  (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
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
