import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import karma from './karma'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  karma,
})

export default rootReducer
