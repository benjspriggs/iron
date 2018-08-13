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
import renderHTML from "react-render-html"
import { Container, Header } from "semantic-ui-react"

export const BlogPost = ({ title, source, html, content, tags, date, url }) => (
  <Container>
    <Header as="h2">
      {title}
      <Header.Subheader>
        by {source}
        {date ? ", on " + date : ""}
      </Header.Subheader>
    </Header>

    <Container text>
      {html
        ? renderHTML(html)
        : content
          ? Array.prototype.map.call(content, (line, idx) => (
              <p key={idx}>{line}</p>
            ))
          : ""}
    </Container>
  </Container>
)

export const postType = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  html: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.array,
  date: PropTypes.string,
  url: PropTypes.string
}

BlogPost.propTypes = postType

export default BlogPost
