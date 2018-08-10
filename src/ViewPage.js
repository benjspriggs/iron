import React from "react"
import PropTypes from "prop-types"
import { Route, Switch } from "react-router"
import { Link } from "react-router-dom"
import { Container, Button, Icon } from "semantic-ui-react"
import { connect } from "react-redux"

import BlogPost from "./BlogPost"
import NoMatch from "./NoMatch"

const BlogPostFromId = connect(state => ({ posts: state.posts.posts }))(
  props => {
    const {
      match: {
        params: { id }
      }
    } = props

    const post = props.posts[id]

    if (post) {
      return (
        <Container>
          <BlogPost id={id} {...post} />
          <Button icon labelPosition="left" as={Link} to={`/edit/${id}`}>
            <Icon name="edit" />
            Edit
          </Button>
        </Container>
      )
    } else {
      return <NoMatch />
    }
  }
)

BlogPostFromId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

const ViewPage = props => (
  <Switch>
    <Route exact path="/view" component={NoMatch} />
    <Route path="/view/:id" component={BlogPostFromId} />
  </Switch>
)

export default ViewPage
