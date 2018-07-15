import React from 'react'
import PropTypes from 'prop-types'
import {
  Container
} from 'semantic-ui-react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import BlogPost from './BlogPost'
import NoMatch from './NoMatch'

const BlogPostFromId = connect(
  state => ({ posts: state.posts.posts })
)(props => {
  const {
    match: {
      params: {
        postId
      }
    }
  } = props

  const post = props.posts[postId]

  if (post) {
    return (<BlogPost id={postId} {...post} />)
  } else {
    return (<NoMatch />)
  }
}
)

BlogPostFromId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string
    })
  })
}

const ViewPage = props => (
  <Switch>
    <Route exact path="/view" component={() => (<Container>Root</Container>)} />
    <Route path="/view/:postId" component={BlogPostFromId} />
  </Switch>
)

export default ViewPage
