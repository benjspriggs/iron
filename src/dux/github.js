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
import { from, of } from "rxjs"
import { mergeMap, catchError } from "rxjs/operators"
import _ from "lodash"
import Octokit from "@octokit/rest"
import { createActions, handleActions } from "redux-actions"
import { ofType, combineEpics } from "redux-observable"

export const REPO_GET_CONTENT = "REPO_GET_CONTENT"
export const REPO_GET_CONTENT_DONE = "REPO_GET_CONTENT_DONE"
export const AS_LIST_KEY = "list"
export const octokit = Octokit({
  timeout: 0,
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": "octokit/rest.js v1.2.3"
  }
})

export const { repoGetContent, clearGithubErrors } = createActions({
  [REPO_GET_CONTENT]: options => ({ ...options }),
  CLEAR_GITHUB_ERRORS: null
})

export default handleActions(
  {
    [clearGithubErrors]: state => ({ ...state, errors: {} }),
    REPO_GET_CONTENT_DONE: (state, action) => {
      const {
        options: { owner, repo }
      } = action.payload

      const storeKey = action.error ? "errors" : "repos"
      const otherStored = _.get(state, storeKey, {})
      const otherRepos = _.get(otherStored, owner, {})

      return {
        ...state,
        [storeKey]: {
          ...otherStored,
          [owner]: {
            ...otherRepos,
            [repo]: action.payload
          }
        }
      }
    }
  },
  { repos: {} }
)

export const getContentEpic = action$ =>
  action$.pipe(
    ofType(REPO_GET_CONTENT),
    mergeMap(action =>
      from(
        octokit.repos.getContent({
          ...action.payload
        })
      ).pipe(
        mergeMap(({ data, ...rest }) =>
          of({
            type: REPO_GET_CONTENT_DONE,
            payload: { data, options: action.payload },
            ...rest
          })
        ),
        catchError(e =>
          of({
            type: REPO_GET_CONTENT_DONE,
            payload: {
              options: action.payload,
              error: e
            },
            error: true
          })
        )
      )
    )
  )

export const githubEpic = combineEpics(getContentEpic)
