import React from 'react'
import PropTypes from 'prop-types'

const purgeState = persistor => () => persistor.purge()
  .then(() => console.log('State has been purged'))
  .catch(e => console.log(e))

const RefreshState = props => (
  <button onClick={purgeState(props.persistor)}>
  Reset State
  </button>
)

RefreshState.propTypes = {
  persistor: PropTypes.object
}

export default RefreshState
