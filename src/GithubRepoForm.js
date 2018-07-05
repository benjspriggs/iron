import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import _ from 'lodash'
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react'

import {
  FormField,
  ResetButton,
  SubmitButton,
  ErrorDisplay,
} from './FormField'

const GithubRepoForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
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

    { _.isEmpty(errors) ? '' : <ErrorDisplay errors={errors} /> }
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
