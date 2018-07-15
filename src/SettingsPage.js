import React from "react"
import { Container, Header } from "semantic-ui-react"

import SimpleGithubRepoForm from "./SimpleGithubRepoForm"
import GithubRepoForm from "./GithubRepoForm"
import CurrentRepos from "./CurrentRepos"
import GithubErrorsDisplay from "./GithubErrorsDisplay"

const SettingsPage = () => (
  <Container>
    <Header as="h2">Settings</Header>
    <Header as="h3">Form</Header>
    <SimpleGithubRepoForm />
    <GithubRepoForm />
    <Header as="h3">Errors</Header>
    <GithubErrorsDisplay />
    <Header as="h3">Repos.</Header>
    <CurrentRepos />
  </Container>
)

export default SettingsPage
