/* eslint-disable import/no-anonymous-default-export */
import { GET_LOCATIONS } from './constants'

const initialState = {
  locations: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      return {
        ...state,
        locations: action.payload,
      }
    }

    default:
      return state
  }
}
