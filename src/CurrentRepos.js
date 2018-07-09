import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  List,
} from 'semantic-ui-react'

export default connect(
  state => state.github
)(props => {
  const items = Object.keys(props.repos)
    .map(owner => (<List.Item key={owner} content={owner} description="Stuff" />))
  return (<Container>
  <List>
    {items}
  </List>
  </Container>)
})
