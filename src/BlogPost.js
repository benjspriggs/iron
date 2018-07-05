import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
} from 'semantic-ui-react'

export const BlogPost = ({ title, source, content = '', tags = [], date = '' }) => (
  <Container>
      <Header as="h2">
      { title }
      <Header.Subheader>
      by { source }, { date }
      </Header.Subheader>
      </Header>

      <Container text>
      {content}
      </Container>
  </Container>
)

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  content: PropTypes.string,
  tags: PropTypes.array,
  date: PropTypes.string,
}

export default BlogPost
