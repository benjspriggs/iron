/**
 * MIT License
 *
 * Copyright (c) 2018 Benjamin Spriggs
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { createStore, applyMiddleware, compose } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createEpicMiddleware } from "redux-observable"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import reduxReset from "redux-reset"
import rootReducer, { rootEpic } from "./dux"

export const history = createHistory()
export const epicMiddleware = createEpicMiddleware()

const initialState = {}
const enhancers = [reduxReset()]
const middleware = [thunk, routerMiddleware(history), epicMiddleware]

const persistConfig = {
  key: "root",
  storage
}

if (process.env.NODE_ENV !== "production") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension())
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const connectedReducer = connectRouter(history)(persistedReducer)

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(connectedReducer, initialState, composedEnhancers)

epicMiddleware.run(rootEpic)

export const persistor = persistStore(store)

export default store
