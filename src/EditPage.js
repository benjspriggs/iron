import React from "react"
import PropTypes from "prop-types"
import { Route, Switch } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Button, Icon } from "semantic-ui-react"

import BlogPost from "./BlogPost"
import PostEditor from "./PostEditor"
import NoMatch from "./NoMatch"
import { postUpdate } from "./dux/posts"

const EditorFromId = props => {
  const {
    match: {
      params: { postId }
    }
  } = props

  const post = props.posts[postId]

  if (post) {
    return (
      <Container>
        <PostEditor
          id={postId}
          buttonText={"Save"}
          post={post}
          updateContent={v => props.updateContent(postId, v)}
          updateSource={v => props.updateSource(postId, v)}
          updateTitle={v => props.updateTitle(postId, v)}
          updateDate={v => props.updateDate(postId, v)}
          handlePostUpdate={props.handlePostUpdate}
        />
        <Button icon labelPosition="left" as={Link} to={"/view/" + postId}>
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
      postId: PropTypes.string
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
        params: { postId }
      }
    } = props

    const post = state.posts[postId]

    return {
      ...state,
      ...dispatch,
      ...props,
      updateContent: (id, content) =>
        dispatch(postUpdate(id, { ...post, content })),
      updateSource: (id, source) =>
        dispatch(postUpdate(id, { ...post, source })),
      updateTitle: (id, title) => dispatch(postUpdate(id, { ...post, title })),
      updateDate: (id, date) => dispatch(postUpdate(id, { ...post, date }))
    }
  }
)(EditorFromId)

const EditPage = props => (
  <Switch>
    <Route exact path="/edit" component={NoMatch} />
    <Route path="/edit/:postId" component={ConnectedEditorFromId} />
  </Switch>
)

export default EditPage
