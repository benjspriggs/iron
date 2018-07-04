import { from, of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
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

export default handleActions({
  REPO_GET_CONTENT: (state) => ({ ...state, clicked: true }),
  REPO_GET_CONTENT_DONE: (state, action) => {
    const {
      options: {
        owner,
        repo
      },
    } = action.payload

    const otherRepos = state.repos[owner] || []

    const storeKey = action.error ? 'errors' : 'repos'

    return { 
      ...state,
      [storeKey]: {
        ...state.repos, 
        [owner]: {
          ...otherRepos,
          [repo]: action.payload,
        }
      },
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
          ...rest,
        })
        ),
        catchError(e => of({ 
          type: REPO_GET_CONTENT_DONE, 
          payload: {
            options: action.payload,
            error: e, 
          },
          error: true
        })),
      )))

export const githubEpic = combineEpics(
  getContentEpic
)
