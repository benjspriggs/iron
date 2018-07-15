import { combineReducers } from "redux"
import github, { githubEpic } from "./github"
import posts, { postsEpic } from "./posts"
import { combineEpics } from "redux-observable"

export default combineReducers({
  github: github,
  posts: posts
})

export const rootEpic = combineEpics(githubEpic, postsEpic)
