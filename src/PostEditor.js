import React from "react"
import PropTypes from "prop-types"
import Editor from "rich-markdown-editor"
import { Form, Container, Button, Input, Segment } from "semantic-ui-react"
import BlogPost from "./BlogPost"
import _ from "lodash"
import { DateInput } from "semantic-ui-calendar-react"
import { Formik } from "formik"

import "semantic-ui-calendar-react/dist/css/calendar.min.css"

const PostEditor = props => (
  <Formik
    render={() => (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              label="Title"
              required
              placeholder="What should the post be titled?"
              value={props.post.title}
              onChange={(e, input) => props.updateTitle(input.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Author"
              required
              placeholder="Who wrote it?"
              value={props.post.source}
              onChange={(e, input) => props.updateSource(input.value)}
            />
          </Form.Field>
          <Form.Field>
            <DateInput
              label="Date"
              name="date"
              value={props.post.date ? props.post.date : ""}
              onChange={(e, i) => props.updateDate(i.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Segment>
            <Editor
              id="content"
              defaultValue={_.join(props.post.content, "\n")}
              onChange={content => props.updateContent(content.split("\n"))}
            />
          </Segment>
        </Form.Field>
        {props.handlePostUpdate ? (
          <Button
            type="submit"
            onClick={() => props.handlePostUpdate(props.post)}
          >
            {props.buttonText}
          </Button>
        ) : (
          ""
        )}
      </Form>
    )}
  />
)

PostEditor.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handlePostUpdate: PropTypes.func,
  updateTitle: PropTypes.func.isRequired,
  updateSource: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  post: PropTypes.shape({ ...BlogPost.propTypes }).isRequired
}

export default PostEditor
