import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withFormik } from 'formik'
import * as yup from 'yup'
import {
  Form
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { repoGetContent } from './dux/github'
import {
  FormField,
  ResetButton,
  SubmitButton,
  ErrorDisplay
} from './FormComponents'

const GithubRepoForm = props => {
  const {
    handleSubmit,
    githubErrors
  } = props

  const extra = githubErrors ? _.flatten(Object.keys(githubErrors)
    .map(owner => Object.keys(githubErrors[owner])
      .reduce((rs, r) => [...rs,
        `${owner}/${r}: ${JSON.parse(githubErrors[owner][r].error.message).message}`], []))) : []

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FormField
          {...props}
          id={'owner'}
          label={'Owner'}
          placeholder={'Enter the repository owner'}
        />

        <FormField
          {...props}
          id={'repo'}
          label={'Repository Name'}
          placeholder={'Enter the repository name'}
        />
      </Form.Group>

      <ResetButton {...props} />
      <SubmitButton {...props} />

      <ErrorDisplay {...props} extra={extra} />
    </Form>
  )
}

GithubRepoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  githubErrors: PropTypes.object
}

export default connect(
  state => ({ githubErrors: state.github.errors }),
  dispatch => ({
    repoGetContent: (values) => dispatch(repoGetContent({ ...values, tree_sha: 'master' }))
  })
)(withFormik({
  displayName: 'GithubRepoForm',
  mapPropsToValues: () => ({ owner: '', repo: '' }),
  validationSchema: yup.object().shape({
    owner: yup.string().required(),
    repo: yup.string().required()
  }),
  handleSubmit: (values, { props: { repoGetContent }, setSubmitting }) => {
    setSubmitting(true)
    repoGetContent(values)
    setSubmitting(false)
  }
})(GithubRepoForm))
