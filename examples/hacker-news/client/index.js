import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import {
  AppContainer,
  createStore,
  deserializeInitialState,
  getOrigin
} from 'resolve-redux'

import getRoutes from './get-routes'
import getRedux from './get-redux'

import Routes from './components/Routes'

const entryPoint = ({
  clientImports,
  rootPath,
  staticPath,
  viewModels,
  subscribeAdapter
}) => {
  const origin = getOrigin(window.location)
  const history = createBrowserHistory({ basename: rootPath })
  const routes = getRoutes(clientImports)
  const redux = getRedux(clientImports, history)

  const store = createStore({
    initialState: deserializeInitialState(viewModels, window.__INITIAL_STATE__),
    redux,
    viewModels,
    subscribeAdapter,
    history,
    origin,
    rootPath,
    isClient: true
  })

  render(
    <AppContainer
      origin={origin}
      rootPath={rootPath}
      staticPath={staticPath}
      store={store}
      history={history}
    >
      <Router history={history}>
        <Routes routes={routes} />
      </Router>
    </AppContainer>,
    document.getElementById('app-container')
  )
}

export default entryPoint
