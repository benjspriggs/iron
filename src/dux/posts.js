// Provides epics, etc for translating
// blobs into posts
import { from } from "rxjs"
import { ajax } from "rxjs/ajax"
import { filter, map, mergeMap } from "rxjs/operators"
import { createActions, handleActions } from "redux-actions"
import { ofType, combineEpics } from "redux-observable"
import marked from "marked"
import { decode } from "base-64"
import _ from "lodash"
import md5 from "md5"

import { octokit } from "./github"

export const lexer = new marked.Lexer()
export const parser = new marked.Parser()

export const POST_GET_CONTENT = "POST_GET_CONTENT"
export const POST_CONVERT_CONTENT = "POST_CONVERT_CONTENT"
export const POST_CONVERT_CONTENT_DONE = "POST_CONVERT_CONTENT_DONE"
export const POST_GET_CONTENT_DONE = "POST_GET_CONTENT_DONE"
export const POST_LOAD_ALL_FROM_REPO = "POST_LOAD_ALL_FROM_REPO"
export const POST_GET_CONTENT_DATE = "POST_GET_CONTENT_DATE"
export const POST_CREATE = "POST_CREATE"
export const POST_DELETE = "POST_DELETE"
export const POST_UPDATE = "POST_UPDATE"

export const {
  postGetContent,
  postConvertContent,
  postConvertContentDone,
  postGetContentDone,
  postLoadAllFromRepo,
  postGetContentDate,
  postCreate,
  postDelete,
  postUpdate
} = createActions({
  [POST_GET_CONTENT]: any => any,
  [POST_CONVERT_CONTENT]: any => any,
  [POST_CONVERT_CONTENT_DONE]: null,
  [POST_GET_CONTENT_DONE]: any => any,
  [POST_LOAD_ALL_FROM_REPO]: ({ owner, repo, data }) => ({ owner, repo, data }),
  [POST_GET_CONTENT_DATE]: any => any,
  [POST_CREATE]: any => ({ ...any }),
  [POST_DELETE]: any => ({ ...any }),
  [POST_UPDATE]: (postId, updates) => ({ postId, ...updates })
})

export const getKeyForPost = post => md5(JSON.stringify(post))

export default handleActions(
  {
    [POST_CREATE]: (state, action) => {
      const existingPosts = _.get(state, "posts", {})

      let post = action.payload

      if (_.get(post, "meta.extension") === "md") {
        // parse this as markdown/ html
        const { title, content, ...rest } = post
        const tokens = lexer.lex(content.join("\n"))
        let withLinks = [...tokens]
        withLinks.links = tokens.links
        post = {
          title,
          content,
          html: parser.parse(withLinks),
          ...rest
        }
      }

      return {
        ...state,
        posts: {
          ...existingPosts,
          [getKeyForPost(post)]: post
        }
      }
    },
    [POST_DELETE]: (state, action) => {
      const existingPosts = _.get(state, "posts", {})

      return {
        ...state,
        posts: {
          ..._.omit(existingPosts, getKeyForPost(action.payload))
        }
      }
    },
    [POST_UPDATE]: (state, action) => {
      const existingPosts = _.get(state, "posts", {})

      const postKey = action.payload.postId
      const withUpdatedPost = { ...existingPosts, [postKey]: action.payload }
      return {
        ...state,
        posts: withUpdatedPost
      }
    },
    [POST_GET_CONTENT_DONE]: (state, action) => {
      const storeKey = action.error ? "errors" : "posts"

      const existingPosts = _.get(state, storeKey, {})

      const postKey = getKeyForPost(action.payload)

      if (existingPosts[postKey]) {
        return state
      }

      return {
        ...state,
        [storeKey]: { ...existingPosts, [postKey]: action.payload }
      }
    }
  },
  { posts: {}, errors: {} }
)

export const parsePostsFromTextBody = ({ meta, _links, content }) =>
  content
    .split("\n")
    .reduce(
      ([latestPost, ...allButLatest], line) => {
        if (line.match(/^\/\//)) {
          return [[line], latestPost, ...allButLatest]
        } else {
          return [[...latestPost, line], ...allButLatest]
        }
      },
      [[]]
    )
    .filter(post => post.length)
    .map(([firstLine, ...rest]) => ({
      // TODO: pull from actual owner when we have that info
      source: meta.owner,
      url: _links.html,
      title: firstLine,
      content: [...rest],
      html: rest.map(r => `<p>${r}</p>`).join("")
    }))

export const postsEpic = combineEpics(
  // postLoadAllFromRepo -> postGetContent
  action$ =>
    action$.pipe(
      ofType(POST_LOAD_ALL_FROM_REPO),
      mergeMap(action =>
        action.payload.data
          // only include files or directories
          .filter(d => ["file", "dir"].includes(d.type))
          .map(d => ({ ...d, extension: d.name.split(".").pop() }))
          // only use markdown or text files
          .filter(d => ["md", "txt"].includes(d.extension))
          .map(d => {
            switch (d.type) {
              case "file":
                // get the content for this file
                return postGetContent({ ...action.payload, ...d })
              default:
                // get all the content in this directory
                return from(
                  octokit.repos.getContent({
                    ...action.payload,
                    ...d
                  })
                ).pipe(postGetContent)
            }
          })
      )
    ),

  // postGetContent -> postConvertContent
  action$ =>
    action$.pipe(
      ofType(POST_GET_CONTENT),
      mergeMap(action =>
        ajax
          .getJSON(action.payload.url)
          .pipe(
            map(response =>
              postConvertContent({ ...response, meta: action.payload })
            )
          )
      )
    ),

  // postConvertContent -> postConvertContentDone
  action$ =>
    action$.pipe(
      ofType(POST_CONVERT_CONTENT),
      map(({ payload: { content, ...rest } }) =>
        postConvertContentDone({ content: decode(content), ...rest })
      )
    ),

  // postGetContentDate -> postConvertContentDone
  // TODO: link repo date with actual date
  action$ =>
    action$.pipe(
      ofType(POST_GET_CONTENT_DATE),
      mergeMap(action =>
        from(
          octokit.repos.getCommit({
            owner: action.payload.meta.owner,
            repo: action.payload.meta.repo,
            sha: action.payload.sha
          })
        ).pipe(
          map(response =>
            postConvertContentDone({
              ...action.payload,
              date: response.author.date,
              source: response.author.name
            })
          )
        )
      )
    ),

  // postConvertContentDone -> postGetContentDone (md)
  action$ =>
    action$.pipe(
      ofType(POST_CONVERT_CONTENT_DONE),
      filter(action => action.payload.meta.extension === "md"),
      mergeMap(action => {
        const tokens = lexer.lex(action.payload.content)
        const { owner } = action.payload.meta

        const byHeader = tokens
          .reduce(
            ([latestPost, ...allButLatest], t) => {
              if (t.type === "heading") {
                return [[t], latestPost, ...allButLatest]
              } else {
                return [[...latestPost, t], ...allButLatest]
              }
            },
            [[]]
          )
          .filter(post => post.length > 0)
          .map(([header, ...content]) => ({
            title: header.text,
            content: content,
            source: owner
          }))
          // only accept posts with titles
          .filter(({ title }) => title)
          .map(({ title, content, ...rest }) => {
            let withLinks = [...content]
            withLinks.links = tokens.links

            return {
              title,
              content: content.join,
              html: parser.parse(withLinks),
              ...rest
            }
          })
          .map(postGetContentDone)

        return from(byHeader)
      })
    ),

  // postConvertContentDone -> postGetContentDone (txt)
  action$ =>
    action$.pipe(
      ofType(POST_CONVERT_CONTENT_DONE),
      filter(action => action.payload.meta.extension === "txt"),
      mergeMap(action =>
        from(parsePostsFromTextBody(action.payload)).pipe(
          map(postGetContentDone)
        )
      )
    )
)
