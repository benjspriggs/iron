import React from "react"
import { Grid, Header, Divider } from "semantic-ui-react"

import SimpleGithubRepoForm from "./SimpleGithubRepoForm"
import GithubRepoForm from "./GithubRepoForm"
import CurrentRepos from "./CurrentRepos"
import GithubErrorsDisplay from "./GithubErrorsDisplay"
import TextExportButton from "./TextExportButton"

const SettingsPage = () => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column>
        <Header as="h3">Simple Form</Header>
        <SimpleGithubRepoForm />
      </Grid.Column>
      <Grid.Column>
        <Header as="h3">Full Form</Header>
        <GithubRepoForm />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <CurrentRepos />
      </Grid.Column>

      <Grid.Column>
        <Header as="h3">Download</Header>
        <TextExportButton />
      </Grid.Column>

      <Grid.Column>
        <GithubErrorsDisplay />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default SettingsPage
