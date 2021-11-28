/* eslint-disable import/no-anonymous-default-export */
import { GET_BIDS } from './constants'

const initialState = {
  bids: [],
  limit: 4,
  offset: 0,
  meta_data: { sum_rows: 0 },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BIDS: {
      return {
        ...state,
        bids: action.payload.bids,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
