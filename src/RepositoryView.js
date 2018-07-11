import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  Container,
  List,
  Button,
  Header
} from 'semantic-ui-react'

import { repoGetContent } from './dux/github'

const DataItem = (item, idx) => (
  <List.Item key={idx} href={item.url}>
    <List.Content>
      <List.Icon name={item.type === 'dir' ? 'folder' : item.type } />
      <List.Header>
        <List.Description>{item.path}</List.Description>
      </List.Header>
      {item.sha}
    </List.Content>
  </List.Item>
)

const RepositoryView = ({ options, repo, onClick }) => (
  <Container>
    <Header as="h3">{ options.owner }</Header>
    <Button onClick={onClick}>Refresh</Button>
    <List>
      { repo === undefined ? 'No repo' : repo.data.map(DataItem) }
    </List>
  </Container>
)

RepositoryView.propTypes = {
  options: PropTypes.shape({
    owner: PropTypes.string.isRequired
  }),
  repo: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default connect(
  (state, { options }) => ({
    repo: _.get(state, `github.repos.${options.owner}.${options.repo}`)
  }),
  (dispatch, props) => ({
    onClick: () => {
      const {
        owner = 'benjspriggs',
        repo = 'iron',
        tree_sha = ''
      } = props.options || {}

      dispatch(repoGetContent({
        owner,
        repo,
        tree_sha,
        recursive: 1
      }))
    }
  })
)(RepositoryView)
