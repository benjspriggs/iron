import React, { Component } from 'react';
import logo from './logo.svg';
import PostsPage from './PostsPage';
import SettingsPage from './SettingsPage';
import NoMatch from './NoMatch';
import { Container, Header, Menu } from 'semantic-ui-react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Link to="/">
        <Header as="h1" >
        <img src={logo} className="App-logo" alt="logo" />
          iron
        </Header>
        </Link>

        <Menu>
        <Menu.Item as={Link} to="/">
        Home
        </Menu.Item>
        <Menu.Item as={Link} to="/settings">
        Settings
        </Menu.Item>
        </Menu>
      <Container>
      <Switch>
        <Route exact path="/" component={PostsPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route component={NoMatch} />
      </Switch>
      </Container>
      </Container>
    );
  }
}

export default App;
