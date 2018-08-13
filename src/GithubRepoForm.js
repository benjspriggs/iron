/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from "react"
import PropTypes from "prop-types"
import { withFormik } from "formik"
import * as yup from "yup"
import { Form } from "semantic-ui-react"
import { connect } from "react-redux"

import { repoGetContent } from "./dux/github"
import {
  FormField,
  ResetButton,
  SubmitButton,
  ErrorDisplay
} from "./FormComponents"

const GithubRepoForm = props => {
  const { handleSubmit } = props

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

GithubRepoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    repoGetContent: values => dispatch(repoGetContent({ ...values, path: "" }))
  })
)(
  withFormik({
    displayName: "GithubRepoForm",
    mapPropsToValues: () => ({ owner: "", repo: "" }),
    validationSchema: yup.object().shape({
      owner: yup.string().required(),
      repo: yup.string().required()
    }),
    handleSubmit: (values, { props: { repoGetContent }, setSubmitting }) => {
      setSubmitting(true)
      repoGetContent(values)
      setSubmitting(false)
    }
  })(GithubRepoForm)
)
