import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { initApp } from './actions'
import 'todomvc-app-css/index.css'
import './index.css'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
)

store.dispatch(initApp())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
