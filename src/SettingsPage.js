import React from 'react'
import GithubRepoForm from './GithubRepoForm'
import CurrentRepos from './CurrentRepos'
import {
  Container
} from 'semantic-ui-react'

const SettingsPage = () => (
  <Container>
  The settings page.
    <GithubRepoForm />
    <CurrentRepos />
  </Container>
)

export default SettingsPage
