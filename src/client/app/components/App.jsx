import React from 'react';
import {
 BrowserRouter as Router,
 Route
} from 'react-router-dom';
import injectSheet from 'react-jss';
import Navigation from 'app/components/Navigation';
import Rankings from 'app/components/Rankings';

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
    </div>
  </Router>
);

export default injectSheet(styles)(App);
