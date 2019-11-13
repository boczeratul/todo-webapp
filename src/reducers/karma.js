import { UPDATE_KARMA } from '../constants/ActionTypes'

const karma = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_KARMA:
      return action.karma
    default:
      return state
  }
}

export default karma
