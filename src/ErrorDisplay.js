import React from 'react'
import _ from 'lodash'
import { Message } from 'semantic-ui-react'

const ErrorDisplay = ({
  errors,
  touched
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

export default ErrorDisplay
