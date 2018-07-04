import { from, of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import Octokit from '@octokit/rest'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'

export const REPO_GET_CONTENT = 'REPO_GET_CONTENT'
export const REPO_GET_CONTENT_DONE = 'REPO_GET_CONTENT_DONE'
export const octokit = Octokit()

export const { 
  repoGetContent,
} = createActions({
  [REPO_GET_CONTENT]: options => ({ ...options })
})

export default (state = {}, action) => {
  switch(action.type) {
    case REPO_GET_CONTENT:
      return { clicked: true }
    case REPO_GET_CONTENT_DONE:
      return { clicked: false }
    default:
      return state
  }
}

export const getContentEpic = action$ =>
  action$.pipe(
    ofType(REPO_GET_CONTENT),
    mergeMap(action => from(
      octokit.repos.getContent({
        ...action.payload
      })).pipe(
    catchError(e => from({ e })),
    mergeMap(({data, ...rest}) => of({
        type: REPO_GET_CONTENT_DONE,
        payload: data,
        ...rest,
      })
    ),
  )))

export const githubEpic = combineEpics(
  getContentEpic
)
