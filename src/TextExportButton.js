import React from "react"
import PropTypes from "prop-types"
import { Button } from "semantic-ui-react"
import Download from "@axetroy/react-download"
import { connect } from "react-redux"

const formatPostForTextExport = post =>
  `${post.title} (by ${post.source})\n${
    post.content ? post.content.join("\n") : ""
  }\n\n`

const TextExportButton = props => (
  <Download
    file="posts.txt"
    content={props.posts.map(formatPostForTextExport).join("")}
  >
    <Button type="button">Click to download</Button>
  </Download>
)

TextExportButton.propTypes = {
  content: PropTypes.array
}

export default connect(state => ({ posts: Object.values(state.posts.posts) }))(
  TextExportButton
)
