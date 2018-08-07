import React from "react"
import { connect } from "react-redux"
import Editor from "rich-markdown-editor"

import { updateContent } from "./dux/edit"

const ConnectedEditor = props => (
  <Editor editorValue={props.content} onChange={props.onChange} />
)

export default connect(
  state => state.edit,
  dispatch => ({
    onChange: content => dispatch(updateContent(content))
  })
)(ConnectedEditor)
