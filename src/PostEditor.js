import React from "react"
import PropTypes from "prop-types"
import Editor from "rich-markdown-editor"
import { Container, Button, Input, Segment } from "semantic-ui-react"
import BlogPost from "./BlogPost"
import _ from "lodash"

const PostEditor = props => (
  <Container>
    <Input
      required
      placeholder="Title"
      value={props.post.title}
      onChange={(e, input) => props.updateTitle(input.value)}
    />
    <Input
      required
      placeholder="Author"
      value={props.post.source}
      onChange={(e, input) => props.updateSource(input.value)}
    />
    <Segment>
      <Editor
        id="content"
        defaultValue={_.join(props.post.content, "")}
        onChange={content => props.updateContent(content.split("\n"))}
      />
    </Segment>
    <Button onClick={() => props.handlePostUpdate(props.post)}>
      {props.buttonText}
    </Button>
  </Container>
)

PostEditor.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handlePostUpdate: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateSource: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  post: PropTypes.shape({ ...BlogPost.propTypes }).isRequired
}

export default PostEditor
