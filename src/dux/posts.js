// Provides epics, etc for translating
// blobs into posts
import { from, timer } from "rxjs"
import { ajax } from "rxjs/ajax"
import { filter, map, switchMap, mergeMap, takeUntil } from "rxjs/operators"
import { createActions, handleActions } from "redux-actions"
import { ofType, combineEpics } from "redux-observable"
import marked from "marked"
import { decode } from "base-64"
import _ from "lodash"

import { octokit } from "./github"

const config = {
  // TODO: make configurable
  API_BASE_URL: "http://localhost:5000"
}

export const POST_GET_CONTENT = "POST_GET_CONTENT"
export const POST_CONVERT_CONTENT = "POST_CONVERT_CONTENT"
export const POST_CONVERT_CONTENT_DONE = "POST_CONVERT_CONTENT_DONE"
export const POST_GET_CONTENT_DONE = "POST_GET_CONTENT_DONE"
export const POST_LOAD_ALL_FROM_REPO = "POST_LOAD_ALL_FROM_REPO"
export const POST_GET_CONTENT_DATE = "POST_GET_CONTENT_DATE"
export const POST_CREATE = "POST_CREATE"
export const POST_DELETE = "POST_DELETE"
export const POST_UPDATE = "POST_UPDATE"
export const POST_GET = "POST_GET"
export const POST_GET_ALL = "POST_GET_ALL"
export const POST_GET_ALL_RESPONSE = "POST_GET_ALL_RESPONSE"
export const POLL_START = "POLL_START"
export const POLL_STOP = "POLL_STOP"

export const {
  postGetContent,
  postConvertContent,
  postConvertContentDone,
  postGetContentDone,
  postLoadAllFromRepo,
  postGetContentDate,
  postCreate,
  postDelete,
  postUpdate,
  postGet,
  postGetAll,
  pollStart,
  pollStop
} = createActions({
  [POST_GET_CONTENT]: any => any,
  [POST_CONVERT_CONTENT]: any => any,
  [POST_CONVERT_CONTENT_DONE]: null,
  [POST_GET_CONTENT_DONE]: any => any,
  [POST_LOAD_ALL_FROM_REPO]: ({ owner, repo, data }) => ({ owner, repo, data }),
  [POST_GET_CONTENT_DATE]: any => any,
  [POST_CREATE]: any => ({ ...any }),
  [POST_DELETE]: id => ({ id }),
  [POST_UPDATE]: (id, updates) => ({ id, ...updates }),
  [POST_GET]: id => ({ id }),
  [POST_GET_ALL]: null,
  [POLL_START]: null,
  [POLL_STOP]: null
})

export const getKeyForPost = post => post.id

const withRenderedMarkdown = post => {
  // parse this as markdown/ html
  const { content, ...rest } = post
  const tokens = new marked.Lexer().lex(content.join("\n"))
  let title = post.title
  let withLinks = [...tokens]

  if (_.get(post, "meta.extension") === "md") {
    let header = tokens[0]

    if (header.type === "heading") {
      title = header.text
    }
  }
  withLinks.links = tokens.links
  return {
    ...rest,
    title,
    content,
    html: new marked.Parser().parse(withLinks)
  }
}

const conformServerResponse = response =>
  response.posts
    .map(post => ({
      ...post,
      content: post.content ? post.content.split(response.newline) : null
    }))
    .reduce((posts, post) => ({ ...posts, [post.id]: post }), {})

export default handleActions(
  {
    [POST_CREATE]: (state, action) => {
      const existingPosts = _.get(state, "posts", {})

      let post = action.payload

      if (!post.id) {
        return
      }

      if (_.get(post, "meta.extension") === "md") {
        post = withRenderedMarkdown(post)
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
          ..._.omit(existingPosts, action.payload.id)
        }
      }
    },
    [POST_UPDATE]: (state, action) => {
      const existingPosts = _.get(state, "posts", {})

      const postKey = action.payload.id
      const existingPost = existingPosts[postKey]
      const newPost = withRenderedMarkdown({
        ...existingPost,
        ...action.payload
      })

      const withUpdatedPost = { ...existingPosts, [postKey]: newPost }

      return {
        ...state,
        posts: withUpdatedPost
      }
    },
    [POST_GET_ALL_RESPONSE]: (state, action) => {
      return {
        ...state,
        posts: conformServerResponse(action.payload),
        errors: { ...state.errors, ...action.errors }
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
        // TODO: find portable way to split on newline
        const lines = action.payload.content.split("\n")
        const { owner } = action.payload.meta

        const byHeader = lines
          .reduce(
            ([latestPost, ...allButLatest], t) => {
              if (t.startsWith("#")) {
                return [[t], latestPost, ...allButLatest]
              } else {
                return [[...latestPost, t], ...allButLatest]
              }
            },
            [[]]
          )
          .filter(post => post.length > 1)
          .map(([header, ...content]) => ({
            // strip the header and add the owner
            title: header.replace(/^#+\s+/g, ""),
            content: [header, ...content],
            source: owner,
            meta: action.payload.meta
          }))
          // only accept posts with titles
          .filter(({ title }) => title)
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
    ),

  // postGetContentDone -> server
  action$ =>
    action$.pipe(
      ofType(postGetContentDone),
      map(action => postCreate(action.payload))
    ),

  // postCreate
  action$ =>
    action$.pipe(
      ofType(POST_CREATE),
      filter(action => !action.payload.id),
      mergeMap(action =>
        ajax
          .post(
            `${config.API_BASE_URL}/post`,
            { post: action.payload },
            { "Content-Type": "application/json" }
          )
          .pipe(
            map(r => ({ type: "POST_CREATE_RESPONSE", payload: r.response })),
            map(action => postGet(action.payload.id))
          )
      )
    ),

  // postGet
  action$ =>
    action$.pipe(
      ofType(POST_GET),
      mergeMap(action =>
        ajax
          .get(`${config.API_BASE_URL}/post?id=${action.payload.id}`)
          .pipe(map(r => ({ type: "POST_GET_RESPONSE", payload: r.response })))
      )
    ),

  // polling for posts
  action$ =>
    action$.pipe(
      ofType(POLL_START),
      switchMap(_ =>
        timer(0, 2500).pipe(
          takeUntil(action$.ofType(POLL_STOP)),
          map(_ => postGetAll())
        )
      )
    ),

  // postGetAll
  action$ =>
    action$.pipe(
      ofType(POST_GET_ALL),
      mergeMap(action =>
        ajax
          .get(`${config.API_BASE_URL}/post`, action.payload, {
            "Content-Type": "application/json"
          })
          .pipe(
            map(r => ({ type: POST_GET_ALL_RESPONSE, payload: r.response }))
          )
      )
    ),

  // postUpdate
  action$ =>
    action$.pipe(
      ofType(POST_UPDATE),
      mergeMap(action =>
        ajax
          .put(
            `${config.API_BASE_URL}/post`,
            { post: action.payload },
            { "Content-Type": "application/json" }
          )
          .pipe(
            map(r => ({ type: "POST_UPDATE_RESPONSE", payload: r.response }))
          )
      )
    ),

  // postDelete
  action$ =>
    action$.pipe(
      ofType(POST_DELETE),
      mergeMap(action =>
        ajax
          .delete(`${config.API_BASE_URL}/post?id=${action.payload.id}`)
          .pipe(
            map(r => ({ type: "POST_DELETE_RESPONSE", payload: r.response }))
          )
      )
    )
)
