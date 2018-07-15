import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxReset from 'redux-reset'
import rootReducer, { rootEpic } from './dux'

export const history = createHistory()
export const epicMiddleware = createEpicMiddleware()

const initialState = {}
const enhancers = [
  reduxReset()
]
const middleware = [
  thunk,
  routerMiddleware(history),
  epicMiddleware
]

const persistConfig = {
  key: 'root',
  storage
}

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const connectedReducer = connectRouter(history)(persistedReducer)

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  connectedReducer,
  initialState,
  composedEnhancers
)

epicMiddleware.run(rootEpic)

export const persistor = persistStore(store)

export default store
