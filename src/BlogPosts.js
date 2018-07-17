import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Icon, List, Divider } from "semantic-ui-react"

import BlogPost from "./BlogPost"

const EnhancedBlogPost = (post, id) => (
  <List.Item key={id}>
    <BlogPost {...post} />
    <Divider hidden />
    <Button icon labelPosition="left" as={Link} to={`/view/${post.id}`}>
      <Icon name="eye" />
      View
    </Button>
    {post.url ? (
      <Button
        attached="right"
        href={post.url}
        icon="external alternate"
        labelPosition="left"
        content="Source"
      />
    ) : (
      ""
    )}
  </List.Item>
)

const BlogPosts = ({ posts }) => (
  <List relaxed divided>
    {posts.map(EnhancedBlogPost)}
  </List>
)

BlogPosts.propTypes = {
  posts: PropTypes.array
}

export default connect(state => ({
  posts: Object.keys(state.posts.posts).map(k => ({
    id: k,
    ...state.posts.posts[k]
  }))
}))(BlogPosts)
