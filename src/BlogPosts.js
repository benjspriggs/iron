import React from 'react'
import BlogPost from './BlogPost'
import { connect } from 'react-redux'

import {
  List,
} from 'semantic-ui-react'

export default ({ posts }) => (
  <List>
  { posts.map(BlogPost) }
  </List>
)
