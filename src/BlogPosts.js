import React from 'react'
import BlogPost from './BlogPost'
import PropTypes from 'prop-types'

import {
  List
} from 'semantic-ui-react'

const BlogPosts = ({ posts }) => (
  <List>
    { posts.map(BlogPost) }
  </List>
)

BlogPosts.propTypes = {
  posts: PropTypes.array
}

export default BlogPosts
