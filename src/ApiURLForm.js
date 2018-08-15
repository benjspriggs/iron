import React from "react"
import PropTypes from "prop-types"
import { withFormik } from "formik"
import * as yup from "yup"
import { Form } from "semantic-ui-react"
import { connect } from "react-redux"

import { updateAPI } from "./dux/config"

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
export default connect(
  null,
  dispatch => ({
    updateAPI: ({ url }) => {
      dispatch(updateAPI(url))
    }
  })
)(
  withFormik({
    displayName: ApiURLForm.displayName,
    mapPropsToValues: () => ({ uri: "" }),
    validationSchema: yup.object().shape({
      uri: yup
        .string()
        .matches(/\S+\/\S+/)
        .required()
    }),
    handleSubmit: (values, { props: { updateAPI }, setSubmitting }) => {
      setSubmitting(true)
      updateAPI(values)
      setSubmitting(false)
    }
  })(ApiURLForm)
)
