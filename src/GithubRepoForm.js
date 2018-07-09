import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import {
  Form,
} from 'semantic-ui-react'

import {
  FormField,
  ResetButton,
  SubmitButton,
  ErrorDisplay,
} from './FormField'

const GithubRepoForm = props => {
  const {
    handleSubmit,
  } = props

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <FormField 
      {...props}
      id={"owner"}
      label={"Owner"}
      placeholder={"Enter the repository owner"}
      />

      <FormField
      {...props}
      id={"repo"}
      label={"Repository Name"}
      placeholder={"Enter the repository name"}
      />
    </Form.Group>

    <ResetButton {...props} />
    <SubmitButton {...props} />

    <ErrorDisplay {...props} />
    </Form>
  )
}

export default withFormik({
  displayName: 'GithubRepoForm',
  mapPropsToValues: () => ({ owner: '', repo: '' }),
  validationSchema: yup.object().shape({
    owner: yup.string().required(),
    repo: yup.string().required(),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(GithubRepoForm)
