// Provides epics, etc for translating
// blobs into posts
import { from, of, ajax } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'

export const POST_GET_CONTENT = 'POST_GET_CONTENT'
export const POST_CONVERT_CONTENT = 'POST_CONVERT_CONTENT'
export const POST_GET_CONTENT_DONE = 'POST_GET_CONTENT_DONE'

export const { 
  postGetContent,
} = createActions({
  [POST_GET_CONTENT]: ({ name, url }) => ({ name, url }),
  [POST_CONVERT_CONTENT]: ({ name, blob }) => ({ name, blob })
})

export default handleActions({
  [POST_GET_CONTENT_DONE]: (state, action) => {
    const storeKey = action.error ? 'errors' : 'posts'

    return { 
      ...state,
      [storeKey]: [...state[storeKey], action.payload ]
    }
  }
}, { posts: [] })


export const postsEpic = combineEpics(
  action$ => action$.pipe(
      ofType(POST_GET_CONTENT),
    // TODO: ajax a request to url and send it to convert_content
      mergeMap(action => {
        return from({
          type: POST_CONVERT_CONTENT,
          payload: {
            ...action.payload
          }
        })
      })
  ),
  // change blobs to actual posts
  // with the given shape
  // TODO
  action$ => action$.pipe(
    ofType(POST_CONVERT_CONTENT),
    mergeMap(action => action),
  ),
)
