// Provides epics, etc for translating
// blobs into posts
import 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap } from 'rxjs/operators'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'

export const POST_GET_CONTENT = 'POST_GET_CONTENT'
export const POST_CONVERT_CONTENT = 'POST_CONVERT_CONTENT'
export const POST_GET_CONTENT_DONE = 'POST_GET_CONTENT_DONE'

export const {
  postGetContent,
  postConvertContent,
  postGetContentDone
} = createActions({
  [POST_GET_CONTENT]: ({ name, url }) => ({ name, url }),
  [POST_CONVERT_CONTENT]: ({ name, blob }) => ({ name, blob }),
  [POST_GET_CONTENT_DONE]: (any) => ({ ...any })
})

export default handleActions({
  [POST_GET_CONTENT_DONE]: (state, action) => {
    const storeKey = action.error ? 'errors' : 'posts'

    return {
      ...state,
      [storeKey]: [...state[storeKey], action.payload]
    }
  }
}, { posts: [] })

export const postsEpic = combineEpics(
  action$ => action$.pipe(
    ofType(POST_GET_CONTENT),
    mergeMap(action => ajax.getJSON(action.payload.url).pipe(
      map(response => postConvertContent({ name: action.payload.name, blob: response.blob }))
    ))
  ),
  // change blobs to actual posts
  // with the given shape
  // TODO
  action$ => action$.pipe(
    ofType(POST_CONVERT_CONTENT),
    mergeMap(action => action)
  )
)
