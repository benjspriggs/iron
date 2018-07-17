import React from "react"
import { Container, Header, Divider } from "semantic-ui-react"

import SimpleGithubRepoForm from "./SimpleGithubRepoForm"
import GithubRepoForm from "./GithubRepoForm"
import CurrentRepos from "./CurrentRepos"
import GithubErrorsDisplay from "./GithubErrorsDisplay"
import TextExportButton from "./TextExportButton"

const SettingsPage = () => (
  <Container>
    <Header as="h2">Form</Header>
    <Header as="h3">Download</Header>
    <TextExportButton />
    <Header as="h3">Simple Form</Header>
    <SimpleGithubRepoForm />
    <Divider />
    <Header as="h3">Full Form</Header>
    <GithubRepoForm />
    <Divider section />
    <Header as="h2">Repos</Header>
    <CurrentRepos />
    <Divider section />
    <Header as="h2">Errors</Header>
    <GithubErrorsDisplay />
  </Container>
)

export default SettingsPage
