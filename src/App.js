import React, { Component } from 'react';
import logo from './logo.svg';
import RepositoryView from './RepositoryView';
import { Container, Header } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">iron</h1>
        </Header>
          <RepositoryView options={{owner: 'benjspriggs', repo: 'iron', path: '', }}/>
          <RepositoryView options={{owner: 'octokit', repo: 'getit', path: '', }}/>
      </Container>
    );
  }
}

export default App;
