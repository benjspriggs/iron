import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import RefreshState from './RefreshState'

import { Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const target = document.getElementById('root')

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <App />
          <Divider />
          <RefreshState persistor={persistor}/>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  target)

registerServiceWorker()
