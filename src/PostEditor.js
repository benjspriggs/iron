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
import Editor from "rich-markdown-editor"
import { Form, Button, Input, Segment } from "semantic-ui-react"
import BlogPost from "./BlogPost"
import _ from "lodash"
import { DateInput } from "semantic-ui-calendar-react"
import { Formik } from "formik"

import "semantic-ui-calendar-react/dist/css/calendar.min.css"

const PostEditor = props => (
  <Formik
    onSubmit={() => props.handlePostUpdate(props.post)}
    render={renderProps => (
      <Form onSubmit={renderProps.handleSubmit}>
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
        <Button.Group>
          {props.handlePostUpdate ? (
            <Button type="submit">{props.buttonText}</Button>
          ) : (
            ""
          )}
          {props.handlePostDelete ? (
            <Button negative onClick={() => props.handlePostDelete(props.post)}>
              Delete
            </Button>
          ) : (
            ""
          )}
        </Button.Group>
      </Form>
    )}
  />
)

PostEditor.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handlePostUpdate: PropTypes.func,
  handlePostDelete: PropTypes.func,
  updateTitle: PropTypes.func.isRequired,
  updateSource: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
  post: PropTypes.shape({ ...BlogPost.propTypes }).isRequired
}

export default PostEditor
