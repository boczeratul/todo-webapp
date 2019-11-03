import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { initApp } from './actions'
import 'todomvc-app-css/index.css'

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(initApp())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
