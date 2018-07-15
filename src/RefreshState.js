import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Container
} from 'semantic-ui-react'
import { connect } from 'react-redux'

const purgeState = persistor => () => persistor.purge()
  .then(d => console.log('State has been purged:', d))
  .catch(e => console.log(e))

const RefreshState = props => (
  <Container>
    <Button onClick={purgeState(props.persistor)}>
  Purge Stored State
    </Button>
    <Button onClick={props.resetState}>
  Reset State
    </Button>
  </Container>
)

RefreshState.propTypes = {
  persistor: PropTypes.object,
  resetState: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({ resetState: () => dispatch({ type: 'RESET' }) })
)(RefreshState)
