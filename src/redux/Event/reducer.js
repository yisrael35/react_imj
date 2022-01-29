/* eslint-disable import/no-anonymous-default-export */
import { GET_EVENTS } from './constants'

const initialState = {
  events: [],
  meta_data: { sum_rows: 0 },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS: {
      return {
        ...state,
        events: action.payload.events,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
