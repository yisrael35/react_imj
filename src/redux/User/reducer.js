/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS } from './constants'

const initialState = {
  users: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
      }
    }

    default:
      return state
  }
}
