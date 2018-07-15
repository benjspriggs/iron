import React from "react"
import { Container, Header, Divider } from "semantic-ui-react"

import SimpleGithubRepoForm from "./SimpleGithubRepoForm"
import GithubRepoForm from "./GithubRepoForm"
import CurrentRepos from "./CurrentRepos"
import GithubErrorsDisplay from "./GithubErrorsDisplay"

const SettingsPage = () => (
  <Container>
    <Header as="h2">Settings</Header>
    <Header as="h3">Form</Header>
    <Header as="h4">Simple Form</Header>
    <SimpleGithubRepoForm />
    <Divider />
    <Header as="h4">Full Form</Header>
    <GithubRepoForm />
    <Divider section />
    <Header as="h3">Repos</Header>
    <CurrentRepos />
    <Divider section />
    <Header as="h3">Errors</Header>
    <GithubErrorsDisplay />
    <Divider section />
  </Container>
)

export default SettingsPage
