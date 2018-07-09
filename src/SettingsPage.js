import React from 'react'
import GithubRepoForm from './GithubRepoForm'
import CurrentRepos from './CurrentRepos'
import {
  Container
} from 'semantic-ui-react'

export default () => (
  <Container>
  The settings page.
  <GithubRepoForm />
  <CurrentRepos />
  </Container>
)
