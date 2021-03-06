/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from "react"
import { Container, Grid, Header } from "semantic-ui-react"

import SimpleGithubRepoForm from "./SimpleGithubRepoForm"
import GithubRepoForm from "./GithubRepoForm"
import CurrentRepos from "./CurrentRepos"
import GithubErrorsDisplay from "./GithubErrorsDisplay"
import TextExportButton from "./TextExportButton"
import ApiURLForm from "./ApiURLForm"

const SettingsPage = () => (
  <Container>
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
        <Grid.Column>
          <Header as="h3">Backend URL</Header>
          <ApiURLForm />
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
  </Container>
)

export default SettingsPage
