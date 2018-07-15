import { from, of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import _ from 'lodash'
import Octokit from '@octokit/rest'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'

export const REPO_GET_CONTENT = 'REPO_GET_CONTENT'
export const REPO_GET_CONTENT_DONE = 'REPO_GET_CONTENT_DONE'
export const AS_LIST_KEY = 'list'
export const octokit = Octokit()

export const {
  repoGetContent,
  clearGithubErrors
} = createActions({
  [REPO_GET_CONTENT]: options => ({ ...options }),
  CLEAR_GITHUB_ERRORS: null
})

export default handleActions({
  [clearGithubErrors]: state => ({ ...state, errors: {} }),
  REPO_GET_CONTENT_DONE: (state, action) => {
    const {
      options: {
        owner,
        repo
      }
    } = action.payload

    const storeKey = action.error ? 'errors' : 'repos'
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
}, { repos: {} })

export const getContentEpic = action$ =>
  action$.pipe(
    ofType(REPO_GET_CONTENT),
    mergeMap(action => from(
      octokit.repos.getContent({
        ...action.payload
      })).pipe(
      mergeMap(({data, ...rest}) => of({
        type: REPO_GET_CONTENT_DONE,
        payload: { data, options: action.payload },
        ...rest
      })
      ),
      catchError(e => of({
        type: REPO_GET_CONTENT_DONE,
        payload: {
          options: action.payload,
          error: e
        },
        error: true
      }))
    )))

export const githubEpic = combineEpics(
  getContentEpic
)
