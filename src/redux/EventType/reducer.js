/* eslint-disable import/no-anonymous-default-export */
import { GET_EVENTS_TYPE } from './constants'

const initialState = {
  events_type: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_TYPE: {
      return {
        ...state,
        events_type: action.payload,
      }
    }

    default:
      return state
  }
}
