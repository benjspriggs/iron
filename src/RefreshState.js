import React from 'react'

const purgeState = persistor => () => persistor.purge()
  .then(() => alert('State has been purged'))

export default props => (
  <button onClick={purgeState(props.persistor)}>
  Reset State
  </button>
)
