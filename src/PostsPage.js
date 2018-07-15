import React from "react"
import BlogPosts from "./BlogPosts"
import { Container } from "semantic-ui-react"
import _ from "lodash"

import { connect } from "react-redux"

export default connect(state => state.posts)(props => (
  <Container>
    <BlogPosts posts={props.posts} />
  </Container>
))
