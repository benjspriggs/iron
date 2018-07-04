import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Item,
} from 'semantic-ui-react'

export const BlogPost = ({ title, source, content = '', tags = [], date = '' }) => (
  <Item>
  <Item.Header as="h2">
  { title }
  </Item.Header>
  <Item.Content>
    <Item.Extra>
    by { source }, { date }
    </Item.Extra>
    <Container text>
    {content}
    </Container>
  </Item.Content>
  </Item>
)

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  content: PropTypes.string,
  tags: PropTypes.array,
  date: PropTypes.string,
}

export default BlogPost
