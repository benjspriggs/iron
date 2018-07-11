import React from 'react'
import PropTypes from 'prop-types'
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
    handleSubmit
  } = props

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

      <ErrorDisplay {...props} />
    </Form>
  )
}

GithubRepoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    repoGetContent: (values) => dispatch(repoGetContent({ ...values, path: '' }))
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
