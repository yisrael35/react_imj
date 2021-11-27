/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS } from './constants'

const initialState = {
  users: [],
  limit: 4,
  offset: 0,
  meta_data: {sum_rows:0},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload.users,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
