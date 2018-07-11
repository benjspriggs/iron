import React from 'react'
import GithubRepoForm from './GithubRepoForm'
import CurrentRepos from './CurrentRepos'
import GithubErrorsDisplay from './GithubErrorsDisplay'
import {
  Container
} from 'semantic-ui-react'

const SettingsPage = () => (
  <Container>
  The settings page.
  Form.
    <GithubRepoForm />
  Errors.
    <GithubErrorsDisplay />
  Repos.
    <CurrentRepos />
  </Container>
)

export default SettingsPage
