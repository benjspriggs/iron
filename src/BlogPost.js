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
