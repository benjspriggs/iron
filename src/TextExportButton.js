import React from "react"
import { Button } from "semantic-ui-react"
import Download from "@axetroy/react-download"

const TextExportButton = props => (
  <Download file="text.txt" content={props.content}>
    <Button type="button">Click to download</Button>
  </Download>
)

export default TextExportButton
