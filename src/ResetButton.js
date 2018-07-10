import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const ResetButton = ({
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

ResetButton.propTypes = {
  id: PropTypes.string.isRequired,
  handleReset: PropTypes.func,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool
}

export default ResetButton
