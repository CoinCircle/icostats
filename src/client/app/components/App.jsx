import React from 'react';
import {
 BrowserRouter as Router,
 Route
} from 'react-router-dom';
import injectSheet from 'react-jss';
import Navigation from 'app/components/Navigation';
import Rankings from 'app/components/Rankings';
import Compare from 'compare/components/Compare';

const styles = {
  container: {
    display: 'flex',
    height: '100%'
  }
};

const App = ({ classes }) => (
  <Router>
    <div className={classes.container}>
      <Navigation />

      <Route exact path="/" component={Rankings} />
      <Route exact path="/roi-over-time" component={Rankings} />
      <Route exact path="/vs-eth" component={Rankings} />
      <Route exact path="/vs-btc" component={Rankings} />
      <Route exact path="/compare" component={Compare} />
    </div>
  </Router>
);

export default injectSheet(styles)(App);
