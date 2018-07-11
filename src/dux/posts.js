// Provides epics, etc for translating
// blobs into posts
import { from } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap } from 'rxjs/operators'
import { createActions, handleActions } from 'redux-actions'
import { ofType, combineEpics } from 'redux-observable'
import marked from 'marked'
import { decode } from 'base-64'
import _ from 'lodash'

import { octokit } from './github'

export const lexer = new marked.Lexer()
export const parser = new marked.Parser()

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
  [POST_GET_CONTENT_DONE]: ({ title, source, content, tags, date }) => ({ title, source, content, tags, date }),
  [POST_LOAD_ALL_FROM_REPO]: ({ owner, repo, data }) => ({ owner, repo, data })
})

export default handleActions({
  [POST_GET_CONTENT_DONE]: (state, action) => {
    const storeKey = action.error ? 'errors' : 'posts'
    const existingPosts = _.get(state, storeKey, [])
    console.dir(action)

    return {
      ...state,
      [storeKey]: existingPosts.concat(action.payload)
    }
  }
}, { posts: [] })

export const postsEpic = combineEpics(
  action$ => action$.pipe(
    ofType(POST_LOAD_ALL_FROM_REPO),
    mergeMap(action => action.payload.data
      // only include files or directories
      .filter(d => ['file', 'dir'].includes(d.type))
      // only use markdown
      .filter(d => d.name.split('.').pop() === 'md')
      .map(d => {
        switch (d.type) {
          case 'file':
            // get the content for this file
            return postGetContent(d)
          default:
            console.dir(d.path)
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
    map(({ payload: { content, ...rest } }) => postConvertContentDone({ content: decode(content), ...rest }))
  ),

  action$ => action$.pipe(
    ofType(POST_CONVERT_CONTENT_DONE),
    mergeMap(action => {
      const tokens = lexer.lex(action.payload.content)
      const meta = {...action.payload}
      delete meta.content

      const byHeader = tokens.reduce(([latestPost, ...allButLatest], t) => {
        if (t.type === 'heading') {
          // add this to the last post
          return [[t], latestPost, ...allButLatest]
        } else {
          return [[...latestPost, t], ...allButLatest]
        }
      }, [[]])
        .filter(post => post.length > 0)
        .map(([header, ...content]) => ({ title: header.text, content: content }))
        // TODO: add source and other meta
        .map(({ title, content }) => {
          let withLinks = [...content]
          withLinks.links = tokens.links

          return ({ title, content: parser.parse(withLinks) })
        })
        .map(postGetContentDone)

      return from(byHeader)
    })
  )
)
