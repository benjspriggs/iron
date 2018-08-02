import React from "react"
import { connect } from "react-redux"
import { updateContent, updateSource, updateTitle } from "./dux/edit"
import { postCreate } from "./dux/posts"
import PostEditor from "./PostEditor"

const NewPostPage = props => <PostEditor {...props} buttonText="Create" />

export default connect(
  state => ({ post: state.edit }),
  dispatch => ({
    updateContent: v => dispatch(updateContent(v)),
    updateSource: v => dispatch(updateSource(v)),
    updateTitle: v => dispatch(updateTitle(v)),
    handlePostUpdate: post => dispatch(postCreate(post))
  })
)(NewPostPage)
