import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import injectSheet from 'react-jss';
import { history } from '~/index.js';
import Navigation from '~/app/components/Navigation';
import Rankings from '~/rankings/screens/Rankings';
import Compare from '~/compare/components/Compare';

const styles = {
  container: {
    display: 'flex',
    height: '100%'
  }
};

const App = ({ classes }) => (
  <ConnectedRouter history={history}>
    <div className={classes.container}>
      <Navigation />

      <Route exact path="/" component={Rankings} />
      <Route exact path="/roi-since-ico" component={Rankings} />
      <Route exact path="/roi-over-time" component={Rankings} />
      <Route exact path="/vs-eth" component={Rankings} />
      <Route exact path="/vs-btc" component={Rankings} />
      <Route exact path="/compare" component={Compare} />
    </div>
  </ConnectedRouter>
);

export default injectSheet(styles)(App);
