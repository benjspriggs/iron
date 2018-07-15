import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import {
  Container,
  Header,
  Button,
  Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const BlogPost = ({ id, title, source, html = false, content = '', tags = [], date = '' }) => (
  <Container>
    <Header as="h2">
      { title }
      <Header.Subheader>
      by { source } { date ? ', ' + date : '' }
      </Header.Subheader>
    </Header>

    <Container text>
      {html ? renderHTML(content) : content}
    </Container>

    <Button icon labelPosition="left" as={Link} to={`/view/${id}`}>
      <Icon name="eye" />
    View
    </Button>
  </Container>
)

BlogPost.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  html: PropTypes.bool,
  content: PropTypes.string,
  tags: PropTypes.array,
  date: PropTypes.string
}

export default BlogPost
