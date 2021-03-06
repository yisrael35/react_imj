/* eslint-disable import/no-anonymous-default-export */
import { GET_UTILS } from './constants'

const initialState = {
  locations: [],
  events_type: [],
  tables: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_UTILS: {
      return {
        ...state,
        locations: action.payload.locations,
        events_type: action.payload.events_type,
        tables: action.payload.tables,
        clients: action.payload.clients,
      }
    }

    default:
      return state
  }
}
