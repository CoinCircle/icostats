// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { history } from '~/index.js';
import Navigation from '~/app/components/Navigation';
import Rankings from '~/rankings/screens/Rankings';
import Compare from '~/compare/components/Compare';
import Feedback from './Feedback';
import Unikoin from './Unikoin';

type Props = {
  isFeedbackOpen: boolean
}

const App = ({ isFeedbackOpen }: Props) => (
  <ConnectedRouter history={history}>
    <div style={{ display: 'flex', height: '100%' }}>
      <Navigation />

      <Route exact path="/" component={Rankings} />
      <Route exact path="/roi-since-ico" component={Rankings} />
      <Route exact path="/roi-over-time" component={Rankings} />
      <Route exact path="/vs-eth" component={Rankings} />
      <Route exact path="/vs-btc" component={Rankings} />
      <Route exact path="/compare" component={Compare} />

      {isFeedbackOpen && <Feedback />}
      <Unikoin />
    </div>
  </ConnectedRouter>
);

const mapStateToProps = state => ({
  isFeedbackOpen: state.app.isFeedbackOpen
});

export default connect(mapStateToProps)(App);
