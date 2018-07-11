import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  List
} from 'semantic-ui-react'

const RepoItem = ({ owner, repo, key, data }) => (
  <List.Item key={key}>
    <List.Icon name="github"/>
    <List.Content>
      <List.Description>
        {owner}/{repo}
      </List.Description>
    </List.Content>
  </List.Item>
)

RepoItem.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  key: PropTypes.any,
  data: PropTypes.object
}

const ReposForOwner = ({ owner, repos, key }) => (
  <List.Item key={key}>
    <List.Icon name="user" />
    <List.Content>
      <List.Header>{owner}</List.Header>
      <List.List>
        { Object.keys(repos[owner])
          .map((repo, key) =>
            <RepoItem
              key={key}
              owner={owner}
              repo={repo}
              data={repos[owner][repo].data}
            />)
        }
      </List.List>
    </List.Content>
  </List.Item>
)

ReposForOwner.propTypes = {
  owner: PropTypes.string,
  repos: PropTypes.array,
  key: PropTypes.any
}

export default connect(
  state => ({ repos: state.github.repos })
)(props => {
  const items = Object.keys(props.repos)
    .map((owner, key) => <ReposForOwner key={key} owner={owner} repos={props.repos} />)

  return (<Container>
    <List>
      {items}
    </List>
  </Container>)
})
