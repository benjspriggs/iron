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
import { Container, Button } from "semantic-ui-react"
import Download from "@axetroy/react-download"
import { connect } from "react-redux"

import { postType } from "./BlogPost"

const formatPostForTextExport = post =>
  `${post.title} (by ${post.source})\n${
    post.content !== undefined && typeof post.content.join === "function"
      ? post.content.join("\n")
      : ""
  }\n\n`

const TextExportButton = props => (
  <Container>
    <Button.Group>
      <Download
        file="posts.txt"
        content={props.posts.map(formatPostForTextExport).join("")}
      >
        <Button type="button">.txt</Button>
      </Download>
      <Download file="posts.json" content={JSON.stringify(props.posts)}>
        <Button type="button">.json</Button>
      </Download>
    </Button.Group>
  </Container>
)

TextExportButton.propTypes = {
  content: PropTypes.arrayOf(postType)
}

export default connect(state => ({ posts: Object.values(state.posts.posts) }))(
  TextExportButton
)
