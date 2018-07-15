import React from "react"
import BlogPosts from "./BlogPosts"
import { Container } from "semantic-ui-react"
import _ from "lodash"
import lorem from "lorem-ipsum"

import { connect } from "react-redux"

const generatePosts = () =>
  _.times(10, i => ({
    title: "anything",
    content: lorem({ count: 5, units: "paragraphs" }),
    source: "me"
  }))

export default connect(state => state.posts)(props => (
  <Container>
    <BlogPosts
      posts={
        props.posts && props.posts.length > 0 ? props.posts : generatePosts()
      }
    />
  </Container>
))
