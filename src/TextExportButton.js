import React from "react"
import PropTypes from "prop-types"
import { Container, Button } from "semantic-ui-react"
import Download from "@axetroy/react-download"
import { connect } from "react-redux"

import { postType } from "./BlogPost"

const formatPostForTextExport = post =>
  `${post.title} (by ${post.source})\n${
    post.content !== undefined &&
    post.content !== null &&
    typeof post.content.join === "function"
      ? post.content.join("\n")
      : ""
  }\n\n`

const TextExportButton = props => (
  <Container>
    <Button.Group>
      <Download
        file="posts.txt"
        content={props.posts.map(formatPostForTextExport).join("")}
      >
        <Button type="button">.txt</Button>
      </Download>
      <Download file="posts.json" content={JSON.stringify(props.posts)}>
        <Button type="button">.json</Button>
      </Download>
    </Button.Group>
  </Container>
)

TextExportButton.propTypes = {
  content: PropTypes.arrayOf(postType)
}

export default connect(state => ({ posts: Object.values(state.posts.posts) }))(
  TextExportButton
)
