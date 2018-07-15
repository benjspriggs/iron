import React from 'react'
import BlogPost from './BlogPost'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  List
} from 'semantic-ui-react'

const BlogPosts = ({ posts }) => (
  <List relaxed divided>
    { posts.map((p, idx) => <List.Item key={idx}><BlogPost {...p} /></List.Item>) }
  </List>
)

BlogPosts.propTypes = {
  posts: PropTypes.array
}

export default connect(
  state => ({ posts: Object.keys(state.posts.posts).map(k => ({ id: k, ...state.posts.posts[k] })) })
)(BlogPosts)
