/* eslint-disable import/no-anonymous-default-export */
import { GET_SUPPLIERS } from './constants'

const initialState = {
  suppliers: [],
  meta_data: { sum_rows: 0 },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS: {
      return {
        ...state,
        suppliers: action.payload.suppliers,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
