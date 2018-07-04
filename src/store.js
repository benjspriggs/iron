import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer, { rootEpic } from './dux'

export const history = createHistory()
export const epicMiddleware = createEpicMiddleware()

const initialState = {}
const enhancers = []
const middleware = [
	thunk,
	routerMiddleware(history),
	epicMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
)

const store = createStore(
	connectRouter(history)(rootReducer),
	initialState,
	composedEnhancers
)

epicMiddleware.run(rootEpic)

export default store

