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
import { connect } from "react-redux"
import _ from "lodash"

import { Container, List, Button, Header } from "semantic-ui-react"

import { repoGetContent } from "./dux/github"

const DataItem = (item, idx) => (
  <List.Item key={idx} href={item.url}>
    <List.Content>
      <List.Icon name={item.type === "dir" ? "folder" : item.type} />
      <List.Header>
        <List.Description>{item.path}</List.Description>
      </List.Header>
      {item.sha}
    </List.Content>
  </List.Item>
)

const RepositoryView = ({ options, repo, onClick }) => (
  <Container>
    <Header as="h3">{options.owner}</Header>
    <Button onClick={onClick}>Refresh</Button>
    <List>{repo === undefined ? "No repo" : repo.data.map(DataItem)}</List>
  </Container>
)

RepositoryView.propTypes = {
  options: PropTypes.shape({
    owner: PropTypes.string.isRequired
  }),
  repo: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default connect(
  (state, { options }) => ({
    repo: _.get(state, `github.repos.${options.owner}.${options.repo}`)
  }),
  (dispatch, props) => ({
    onClick: () => {
      const { owner = "benjspriggs", repo = "iron", tree_sha = "" } =
        props.options || {}

      dispatch(
        repoGetContent({
          owner,
          repo,
          tree_sha,
          recursive: 1
        })
      )
    }
  })
)(RepositoryView)
