import React from "react"
import PropTypes from "prop-types"
import { Form } from "semantic-ui-react"

const FormField = ({
  id,
  label,
  placeholder,
  handleChange,
  handleBlur,
  values = {}
}) => (
  <Form.Field>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      placeholder={placeholder}
      value={values[id]}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Form.Field>
)

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object
}

export default FormField
