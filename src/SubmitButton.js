import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const SubmitButton = ({
  isSubmitting
}) => (
  <Button type="submit" disabled={isSubmitting}>
    Submit
  </Button>
)

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool
}

export default SubmitButton
