// Provides epics, etc for translating
// blobs into posts
import { from } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { decode } from 'base-64'
import { map, mergeMap } from 'rxjs/operators'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'

import { octokit } from './github'

export const POST_GET_CONTENT = 'POST_GET_CONTENT'
export const POST_CONVERT_CONTENT = 'POST_CONVERT_CONTENT'
export const POST_CONVERT_CONTENT_DONE = 'POST_CONVERT_CONTENT_DONE'
export const POST_GET_CONTENT_DONE = 'POST_GET_CONTENT_DONE'
export const POST_LOAD_ALL_FROM_REPO = 'POST_LOAD_ALL_FROM_REPO'

export const {
  postGetContent,
  postConvertContent,
  postConvertContentDone,
  postGetContentDone,
  postLoadAllFromRepo
} = createActions({
  [POST_GET_CONTENT]: ({ name, url }) => ({ name, url }),
  [POST_CONVERT_CONTENT]: any => any,
  [POST_CONVERT_CONTENT_DONE]: null,
  [POST_GET_CONTENT_DONE]: any => ({ ...any }),
  [POST_LOAD_ALL_FROM_REPO]: ({ owner, repo, data }) => ({ owner, repo, data })
})

export default handleActions({
  [POST_GET_CONTENT_DONE]: (state, action) => {
    console.dir(state)
    console.dir(action)
    const storeKey = action.error ? 'errors' : 'posts'

    return {
      ...state,
      [storeKey]: [...state[storeKey], action.payload]
    }
  }
}, { posts: [] })

export const postsEpic = combineEpics(
  action$ => action$.pipe(
    ofType(POST_LOAD_ALL_FROM_REPO),
    mergeMap(action => action.payload.data
      .filter(d => ['file', 'dir'].includes(d.type))
      .filter(d => d.name.split('.').pop() === 'md')
      .map(d => {
        switch (d.type) {
          case 'file':
            // get the content for this file
            return postGetContent(d)
          default:
            // get all the content in this directory
            return from(octokit.repos.getContent({
              owner: action.payload.owner,
              repo: action.payload.repo,
              path: d.path
            }))
        }
      })
    )
  ),

  action$ => action$.pipe(
    ofType(POST_GET_CONTENT),
    mergeMap(action => ajax.getJSON(action.payload.url).pipe(
      map(postConvertContent)
    ))
  ),

  action$ => action$.pipe(
    ofType(POST_CONVERT_CONTENT),
    map(({ payload: content }) => postConvertContentDone(decode(content)))
  )
)
