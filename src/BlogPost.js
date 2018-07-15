import React from "react"
import PropTypes from "prop-types"
import renderHTML from "react-render-html"
import { Container, Header } from "semantic-ui-react"

export const BlogPost = ({
  title,
  source,
  html = false,
  content = "",
  tags = [],
  date = ""
}) => (
  <Container>
    <Header as="h2">
      {title}
      <Header.Subheader>
        by {source} {date ? ", " + date : ""}
      </Header.Subheader>
    </Header>

    <Container text>{html ? renderHTML(content) : content}</Container>
  </Container>
)

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  html: PropTypes.bool,
  content: PropTypes.string,
  tags: PropTypes.array,
  date: PropTypes.string
}

export default BlogPost
