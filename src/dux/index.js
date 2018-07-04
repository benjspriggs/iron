import { combineReducers } from 'redux'
import github, { githubEpic } from './github'
import { combineEpics } from 'redux-observable'

export default combineReducers({
	github: github
})

export const rootEpic = combineEpics(
	githubEpic
)
