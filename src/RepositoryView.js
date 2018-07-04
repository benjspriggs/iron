import React from 'react'
import { connect } from 'react-redux'
import { repoGetContent } from './dux/github'
import _ from 'lodash'
import { 
  Container, 
  List,
  Button,
  Header,
  Icon
} from 'semantic-ui-react'

export const DataItem = (item, idx) => (
  <List.Item key={idx}>
  <List.Content>
  <List.Header>
  <Icon name={item.type === 'dir' ? 'folder' : item.type } />
  {item.name}
  </List.Header>
  {item.sha}
  </List.Content>
  </List.Item>
  )

export const RepositoryView = ({ options, repo, onClick }) => (
  <Container>
  <Header as="h3">{ options.owner }</Header>
  <Button onClick={onClick}>Refresh</Button>
  <List>
  { repo === undefined ? 'No repo' : repo.data.map(DataItem) }
  </List>
  </Container>
)

export default connect(
  (state, { options }) => ({ 
    repo: _.get(state, `github.repos.${options.owner}.${options.repo}`) 
  }),
  (dispatch, props) => ({
    onClick: () => {
      const {
        owner = 'benjspriggs',
        repo = 'iron',
        path = ''
      } = props.options || {}

      dispatch(repoGetContent({
        owner,
        repo,
        path
      }))
    }
  })
)(RepositoryView)
