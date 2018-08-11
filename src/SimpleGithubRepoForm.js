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

const SimpleGithubRepoForm = props => {
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FormField
          {...props}
          id={"uri"}
          label={"URI"}
          placeholder={"Enter the GH URI"}
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
      const [owner, repo] = uri.split("/")

      dispatch(repoGetContent({ owner: owner, repo: repo, path: "" }))
    }
  })
)(
  withFormik({
    displayName: "GithubRepoForm",
    mapPropsToValues: () => ({ uri: "" }),
    validationSchema: yup.object().shape({
      uri: yup
        .string()
        .matches(/\S+\/\S+/)
        .required()
    }),
    handleSubmit: (values, { props: { repoGetContent }, setSubmitting }) => {
      setSubmitting(true)
      repoGetContent(values)
      setSubmitting(false)
    }
  })(SimpleGithubRepoForm)
)
