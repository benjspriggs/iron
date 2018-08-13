/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Icon, List } from "semantic-ui-react"
import LazyLoad from "react-lazy-load"

import BlogPost from "./BlogPost"

const EnhancedBlogPost = (post, id) => (
  <List.Item key={id}>
    <BlogPost {...post} />
    <Button.Group>
      <Button
        id="view-icon"
        icon
        labelPosition="left"
        as={Link}
        to={`/view/${post.id}`}
      >
        <Icon name="eye" />
        View
      </Button>
      {post.url ? (
        <Button
          id="source-iron"
          href={post.url}
          icon="external alternate"
          labelPosition="left"
          content="Source"
        />
      ) : (
        ""
      )}
    </Button.Group>
  </List.Item>
)

const BlogPosts = ({ posts }) => (
  <LazyLoad>
    <List relaxed divided>
      {posts.map(EnhancedBlogPost)}
    </List>
  </LazyLoad>
)

BlogPosts.propTypes = {
  posts: PropTypes.array
}

export default connect(state => ({
  posts: Object.values(state.posts.posts)
}))(BlogPosts)
