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
        params: { postId }
      }
    } = props

    const post = props.posts[postId]

    if (post) {
      return (
        <Container>
          <BlogPost id={postId} {...post} />
          <Button icon labelPosition="left" as={Link} to={`/edit/${postId}`}>
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
      postId: PropTypes.string
    })
  })
}

const ViewPage = props => (
  <Switch>
    <Route exact path="/view" component={NoMatch} />
    <Route path="/view/:postId" component={BlogPostFromId} />
  </Switch>
)

export default ViewPage
