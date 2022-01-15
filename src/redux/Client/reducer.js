/* eslint-disable import/no-anonymous-default-export */
import {GET_CLIENTS, GET_CLIENT} from './constants'

const initialState = {
  clients: [],
  meta_data: {sum_rows:0},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS: {
      return {
        ...state,
        clients: action.payload.clients,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
