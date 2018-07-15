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

const SimpleGithubRepoForm = props => {
  const {
    handleSubmit
  } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FormField
          {...props}
          id={'uri'}
          label={'URI'}
          placeholder={'Enter the GH URI'}
        />
      </Form.Group>

      <ResetButton {...props} />
      <SubmitButton {...props} />

      <ErrorDisplay {...props} />
    </Form>
  )
}

SimpleGithubRepoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    repoGetContent: ({ uri }) => {
      const [owner, repo] = uri.split('/')

      dispatch(repoGetContent({ owner: owner, repo: repo, path: '' }))
    }
  })
)(withFormik({
  displayName: 'GithubRepoForm',
  mapPropsToValues: () => ({ uri: '' }),
  validationSchema: yup.object().shape({
    uri: yup.string().required()
  }),
  handleSubmit: (values, { props: { repoGetContent }, setSubmitting }) => {
    setSubmitting(true)
    repoGetContent(values)
    setSubmitting(false)
  }
})(SimpleGithubRepoForm))
