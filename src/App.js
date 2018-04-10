import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Landing from './components/Containers/Landing';
import NewsFeed from './components/Containers/NewsFeed';
import CreateGroup from './components/Containers/CreateGroup';
import Group from './components/Containers/Group';
import MyAccount from './components/Containers/MyAccount';
import User from './components/Containers/User';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/feed" component={NewsFeed} />
          <Route exact path="/group/create" component={CreateGroup} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/group/:id" component={Group} />
          <Route exact path="/user/:id" component={User} />
        </div>
      </Router>
    );
  }
}

export default App;
