import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  List,
  Message
} from 'semantic-ui-react'

const GithubErrorsDisplay = ({ githubErrors }) => {
  const extra = githubErrors ? _.flatten(Object.keys(githubErrors)
    .map(owner => Object.keys(githubErrors[owner])
      .reduce((rs, r) => [...rs,
        `${owner}/${r}: ${JSON.parse(githubErrors[owner][r].error.message).message}`], []))) : []

  return (
    <List>
      { extra.map((e, key) => <Message key={key} content={e} header={'Error'}/>) }
    </List>
  )
}

GithubErrorsDisplay.propTypes = {
  githubErrors: PropTypes.object
}

export default connect(
  state => ({ githubErrors: state.github.errors })
)(GithubErrorsDisplay)
