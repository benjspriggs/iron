import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import {
  Form,
  Button,
} from 'semantic-ui-react'

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
    <Form.Field>
      <label htmlFor="email">
      Email
      </label>
      <input
      id="email"
      placeholder="Enter your email"
      type="text"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors.email && touched.email ? 'text-input error' : 'text-input'}
      />
      {errors.email &&
        touched.email && <div className="input-feedback">{errors.email}</div>}
    </Form.Field>

    <Button
    type="button"
    className="outline"
    onClick={handleReset}
    disabled={!dirty || isSubmitting}
    >
    Reset
    </Button>
    <Button type="submit" disabled={isSubmitting}>
    Submit
    </Button>

    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({ email: '' }),
    validationSchema: yup.object().shape({
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        }),
    handleSubmit: (values, { setSubmitting }) => {
          setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 1000);
        },
    displayName: 'BasicForm', // helps with React DevTools
})(GithubRepoForm)
