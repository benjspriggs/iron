import React from 'react'
import PropTypes from 'prop-types'

import {
  Form,
  Message,
  Button,
} from 'semantic-ui-react'

export const FormField = ({
  id,
  label,
  placeholder,
  handleChange,
  handleBlur,
  values,
}) => (
  <Form.Field>
    <label htmlFor={id}>
    {label}
    </label>
    <input id={id} placeholder={placeholder} value={values[id]} onChange={handleChange}
    onBlur={handleBlur}/>
  </Form.Field>
)

FormField.propTypes = {
  id: PropTypes.string.required,
  label: PropTypes.string,
}

export const ResetButton = ({
  id,
  handleReset,
  dirty,
  isSubmitting
}) => (
  <Button
  id={id}
  type="button"
  onClick={handleReset}
  disabled={!dirty || isSubmitting}
  >
  Reset
  </Button>
)

export const SubmitButton = ({
  isSubmitting,
}) => (
    <Button type="submit" disabled={isSubmitting}>
    Submit
    </Button>
)

export const ErrorDisplay = ({
  errors
}) => (
  <Message negative
  header="Error"
  list={Object.values(errors)}
  />
)
