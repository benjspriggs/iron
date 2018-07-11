import React from 'react'
import BlogPost from './BlogPost'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  List
} from 'semantic-ui-react'

const BlogPosts = ({ posts }) => (
  <List>
    { posts.map((p, idx) => <BlogPost {...p} key={idx} />) }
  </List>
)

BlogPosts.propTypes = {
  posts: PropTypes.array
}

export default connect(
  state => ({ posts: state.posts.posts })
)(BlogPosts)
