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
