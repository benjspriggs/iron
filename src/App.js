/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { Component } from "react"
import logo from "./logo.svg"
import PostsPage from "./PostsPage"
import SettingsPage from "./SettingsPage"
import NoMatch from "./NoMatch"
import ViewPage from "./ViewPage"
import EditPage from "./EditPage"
import NewPostPage from "./NewPostPage"
import {
  Container,
  Header,
  Menu,
  Image,
  Segment,
  Divider
} from "semantic-ui-react"
import { Route, Switch } from "react-router"
import { Link } from "react-router-dom"
import "./App.css"

class App extends Component {
  render() {
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
            <Menu.Item as={Link} to="/create">
              Create
            </Menu.Item>
            <Menu.Item position="right" as={Link} to="/settings">
              Settings
            </Menu.Item>
          </Menu>
        </Segment>

        <Divider hidden />

        <Container>
          <Switch>
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/create" component={NewPostPage} />
            <Route path="/view" component={ViewPage} />
            <Route path="/edit" component={EditPage} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Container>
    )
  }
}

export default App
