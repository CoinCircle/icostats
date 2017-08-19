import 'babel-polyfill';
import 'isomorphic-fetch';
import '~/app/lib/set-web3';
import React from 'react';
import ReactDOM from 'react-dom';
import identifyUser from '~/app/lib/identify';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';
import App from 'app/components/App';
import appReducer from 'app/reducers';
import compareReducer from 'compare/reducers';
import rankingsReducer from '~/rankings/reducers';
import exchangeReducer from '~/exchange/reducers';
import analytics, { middleware as a7sMiddleware } from '~/app/lib/analytics';

// Create browser history
export const history = createHistory();

analytics.install(window);

// Support redux devtools extension
const reduxDevtoolsExt = window.__REDUX_DEVTOOLS_EXTENSION__;
const isReduxDevtoolsDefined = typeof reduxDevtoolsExt !== 'undefined';
const reduxDevtools = isReduxDevtoolsDefined ? reduxDevtoolsExt() : f => f;

// GraphQL Apollo Client
// Create regular NetworkInterface by using apollo-client's API:
const networkInterface = createNetworkInterface({
  uri: '/graphql' // Your GraphQL endpoint
});
// Create WebSocket client
const wsClient = new SubscriptionClient(`ws://localhost:3000/subscriptions`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  }
});
// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

// Root redux reducer
const reducer = combineReducers({
  app: appReducer,
  compare: compareReducer,
  apollo: client.reducer(),
  router: routerReducer,
  rankings: rankingsReducer,
  exchange: exchangeReducer
});
const initialState = {};
const middlewares = applyMiddleware(
  client.middleware(),
  routerMiddleware(history),
  thunk,
  a7sMiddleware // Should always go last to ensure it receives objects only
);
const enhancer = compose(middlewares, reduxDevtools);
const store = createStore(reducer, initialState, enhancer);

// React
const app = (
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
);
const rootElement = document.getElementById('app');

ReactDOM.render(app, rootElement, onRendered);

// Anything that is lower priority than getting the app rendered should go here.
function onRendered() {
  identifyUser();
}
