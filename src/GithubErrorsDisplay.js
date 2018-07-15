import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import _ from "lodash"
import { Container, List, Button, Message } from "semantic-ui-react"

import { clearGithubErrors } from "./dux/github"

const GithubErrorsDisplay = ({ githubErrors, clearGithubErrors }) => {
  const extra = githubErrors
    ? _.flatten(
        Object.keys(githubErrors).map(owner =>
          Object.keys(githubErrors[owner]).reduce(
            (rs, r) => [
              ...rs,
              `${owner}/${r}: ${githubErrors[owner][r].error.message}`
            ],
            []
          )
        )
      )
    : []

  return (
    <Container>
      <List>
        {extra.map((e, key) => (
          <Message key={key} content={e} header={"Error"} />
        ))}
      </List>
      <Button onClick={() => clearGithubErrors()}>Clear Errors</Button>
    </Container>
  )
}

GithubErrorsDisplay.propTypes = {
  githubErrors: PropTypes.object,
  clearGithubErrors: PropTypes.func.isRequired
}

export default connect(
  state => ({ githubErrors: state.github.errors }),
  dispatch => ({
    clearGithubErrors: () => dispatch(clearGithubErrors())
  })
)(GithubErrorsDisplay)
