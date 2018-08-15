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
import { Button, Container } from "semantic-ui-react"
import { connect } from "react-redux"
import { pollStart, pollStop } from "./dux/posts"

const purgeState = persistor => () =>
  persistor
    .purge()
    .then(d => console.log("State has been purged"))
    .catch(e => console.log(e))

const RefreshState = props => (
  <Container>
    <Button onClick={purgeState(props.persistor)}>Purge Stored State</Button>
    <Button onClick={props.resetState}>Reset State</Button>
    <Button positive onClick={props.pollStart}>
      Start Polling
    </Button>
    <Button negative onClick={props.pollStop}>
      Stop Polling
    </Button>
  </Container>
)

RefreshState.propTypes = {
  persistor: PropTypes.object,
  resetState: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    resetState: () => dispatch({ type: "RESET" }),
    pollStart: () => dispatch(pollStart()),
    pollStop: () => dispatch(pollStop())
  })
)(RefreshState)
