import React, { Component } from 'react';
import logo from './logo.svg';
import BlogPost from './BlogPost';
import { Container, Header } from 'semantic-ui-react';
import lorem from 'lorem-ipsum';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">iron</h1>
        </Header>
	    <BlogPost title="hi" source="me" date="1 hour ago"
	    content={
		    lorem({
			    count: 2,
			    units: "paragraphs"
		    })
	    }/>
      </Container>
    );
  }
}

export default App;
