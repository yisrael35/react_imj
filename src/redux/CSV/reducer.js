/* eslint-disable import/no-anonymous-default-export */
import { GET_CSV, DELETE_CSV } from './constants'

const initialState = {
  file_name: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CSV: {
      return {
        ...state,
        file_name: action.payload.file_name,
      }
    }
    case DELETE_CSV: {
      return {
        ...state,
        file_name: undefined,
      }
    }

    default:
      return state
  }
}
