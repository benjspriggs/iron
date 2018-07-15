import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  List,
  Button
} from 'semantic-ui-react'

import { postLoadAllFromRepo } from './dux/posts'

const RepoItem = ({ owner, repo, id, data, postLoadAllFromRepo }) => (
  <List.Item key={id}>
    <List.Icon name="github"/>
    <List.Content>
      <List.Description>
        <Button onClick={() => postLoadAllFromRepo({ owner, repo, data })}>
        Get Posts
        </Button>
        {owner}/{repo}
      </List.Description>
    </List.Content>
  </List.Item>
)

RepoItem.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  id: PropTypes.any,
  data: PropTypes.array,
  postLoadAllFromRepo: PropTypes.func.isRequired
}

const ReposForOwner = ({ owner, repos, id, postLoadAllFromRepo }) => (
  <List.Item key={id}>
    <List.Icon name="user" />
    <List.Content>
      <List.Header>{owner}</List.Header>
      <List.List>
        { Object.keys(repos[owner])
          .map((repo, repoItemId) =>
            <RepoItem
              key={repoItemId}
              owner={owner}
              repo={repo}
              data={repos[owner][repo].data}
              postLoadAllFromRepo={postLoadAllFromRepo}
            />)
        }
      </List.List>
    </List.Content>
  </List.Item>
)

ReposForOwner.propTypes = {
  owner: PropTypes.string,
  repos: PropTypes.object,
  id: PropTypes.number,
  postLoadAllFromRepo: PropTypes.func.isRequired
}

export default connect(
  state => ({ repos: state.github.repos }),
  dispatch => ({ postLoadAllFromRepo: val => dispatch(postLoadAllFromRepo(val)) })
)(props => {
  const items = Object.keys(props.repos)
    .map((owner, repoId) => <ReposForOwner postLoadAllFromRepo={props.postLoadAllFromRepo} key={repoId} owner={owner} repos={props.repos} />)

  return (<Container>
    <List>
      {items}
    </List>
  </Container>)
})
