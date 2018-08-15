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
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Button, Icon, Divider } from "semantic-ui-react"

import BlogPost from "./BlogPost"
import PostEditor from "./PostEditor"
import NoMatch from "./NoMatch"
import { postUpdate, postDelete } from "./dux/posts"

const EditorFromId = props => {
  const {
    match: {
      params: { id }
    }
  } = props

  const post = props.posts[id]

  if (post) {
    return (
      <Container>
        <PostEditor
          id={id}
          buttonText={"Save"}
          post={post}
          updateContent={v => props.updateContent(id, v)}
          updateSource={v => props.updateSource(id, v)}
          updateTitle={v => props.updateTitle(id, v)}
          updateDate={v => props.updateDate(id, v)}
          handlePostUpdate={props.handlePostUpdate}
          handlePostDelete={props.handlePostDelete}
        />
        <Divider />
        <Button icon labelPosition="left" as={Link} to={"/view/" + id}>
          <Icon name="eye" />
          View
        </Button>
      </Container>
    )
  } else {
    return <NoMatch />
  }
}

EditorFromId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  posts: PropTypes.shape({ posts: PropTypes.shape({ ...BlogPost.propTypes }) })
}

const ConnectedEditorFromId = connect(
  state => ({ posts: state.posts.posts }),
  null,
  (state, { dispatch }, props) => {
    const {
      match: {
        params: { id }
      }
    } = props

    const post = state.posts[id]

    return {
      ...state,
      ...dispatch,
      ...props,
      updateContent: (id, content) =>
        dispatch(postUpdate(id, { ...post, content })),
      updateSource: (id, source) =>
        dispatch(postUpdate(id, { ...post, source })),
      updateTitle: (id, title) => dispatch(postUpdate(id, { ...post, title })),
      updateDate: (id, date) => dispatch(postUpdate(id, { ...post, date })),
      handlePostDelete: post => dispatch(postDelete(post.id))
    }
  }
)(EditorFromId)

const EditPage = props => (
  <Switch>
    <Route exact path="/edit" component={NoMatch} />
    <Route path="/edit/:id" component={ConnectedEditorFromId} />
  </Switch>
)

export default EditPage
