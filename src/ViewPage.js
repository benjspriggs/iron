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
import { Route, Switch } from "react-router"
import { Link } from "react-router-dom"
import { Container, Responsive, Button, Icon } from "semantic-ui-react"
import { connect } from "react-redux"

import BlogPost from "./BlogPost"
import NoMatch from "./NoMatch"

const BlogPostFromId = connect(state => ({ posts: state.posts.posts }))(
  props => {
    const {
      match: {
        params: { id }
      }
    } = props

    const post = props.posts[id]

    if (post) {
      return (
        <Responsive as={Container}>
          <BlogPost id={id} {...post} />
          <Button icon labelPosition="left" as={Link} to={`/edit/${id}`}>
            <Icon name="edit" />
            Edit
          </Button>
        </Responsive>
      )
    } else {
      return <NoMatch />
    }
  }
)

BlogPostFromId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

const ViewPage = props => (
  <Switch>
    <Route exact path="/view" component={NoMatch} />
    <Route path="/view/:id" component={BlogPostFromId} />
  </Switch>
)

export default ViewPage
