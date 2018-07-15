import React, { Component } from 'react'
import logo from './logo.svg'
import PostsPage from './PostsPage'
import SettingsPage from './SettingsPage'
import NoMatch from './NoMatch'
import ViewPage from './ViewPage'
import { Container, Header, Menu, Image, Segment } from 'semantic-ui-react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  render () {
    return (
      <Container>
        <Header as="h1" attached="top">
          <Image src={logo} className="App-logo" alt="logo" />
      iron
        </Header>

        <Segment attached>
          <Menu>
            <Menu.Item as={Link} to="/">
      Home
            </Menu.Item>
            <Menu.Item as={Link} to="/view">
      View
            </Menu.Item>
            <Menu.Item as={Link} to="/settings">
      Settings
            </Menu.Item>
          </Menu>
        </Segment>

        <Container>
          <Switch>
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route path="/view" component={ViewPage} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Container>
    )
  }
}

export default App
