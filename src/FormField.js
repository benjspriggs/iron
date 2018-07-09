import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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
  id: PropTypes.string.isRequied,
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
  errors,
  touched,
}) => {
  if (_.isEmpty(errors)) {
    return null
  }

  const filteredKeys = Object
    .keys(errors)
    .filter(k => touched[k])
    .reduce((obj, k) => ({ ...obj, [k]: errors[k] }), {})

  if (_.isEmpty(filteredKeys)) {
    return null
  } else {
  return (<Message negative
          header="Error"
          list={Object.values(filteredKeys)}
          />)
  }
}
