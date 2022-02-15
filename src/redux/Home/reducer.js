/* eslint-disable import/no-anonymous-default-export */
import { GET_HOME_EVENTS, SAVE_DATE } from './constants'

const initialState = {
  events: [],
  meta_data: { sum_rows: 0 },
  saved_date: new Date(),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_EVENTS: {
      return {
        ...state,
        events: action.payload.events,
        meta_data: action.payload.meta_data,
      }
    }
    case SAVE_DATE: {
      return {
        ...state,
        saved_date: action.payload.last_date,
      }
    }

    default:
      return state
  }
}
