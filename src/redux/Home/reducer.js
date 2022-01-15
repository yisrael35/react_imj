/* eslint-disable import/no-anonymous-default-export */
import { GET_EVENTS } from './constants'

const initialState = {
  events: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS: {
      return {
        ...state,
        events: action.payload.events,
      }
    }

    default:
      return state
  }
}
