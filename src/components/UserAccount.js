import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/useraccount.scss';

const user = {
  firstName: 'John',
  lastName: 'Doe'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello {user.firstName} {user.lastName}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;