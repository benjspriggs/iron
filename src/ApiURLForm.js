import React from "react"
import PropTypes from "prop-types"
import { withFormik } from "formik"
import * as yup from "yup"
import { Form } from "semantic-ui-react"
import { connect } from "react-redux"

import { updateApi } from "./dux/config"

import {
  FormField,
  ResetButton,
  SubmitButton,
  ErrorDisplay
} from "./FormComponents"

const ApiURLForm = props => {
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FormField
          {...props}
          id={"url"}
          label={"URL"}
          placeholder={"Enter the API URL"}
        />
      </Form.Group>

      <ResetButton {...props} />
      <SubmitButton {...props} />

      <ErrorDisplay {...props} />
    </Form>
  )
}

ApiURLForm.propTypes = {
  update: PropTypes.func.isRequired
}

export default connect(
  state => ({ url: state.config.API_BASE_URL }),
  dispatch => ({
    update: ({ url }) => {
      dispatch(updateApi(url))
    }
  })
)(
  withFormik({
    displayName: "ApiURLForm",
    validationSchema: yup.object().shape({
      url: yup
        .string()
        .matches(/[^/]$/)
        .required()
    }),
    handleSubmit: (values, { props: { update }, setSubmitting }) => {
      setSubmitting(true)
      update(values)
      setSubmitting(false)
    }
  })(ApiURLForm)
)
