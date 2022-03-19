/* eslint-disable import/no-anonymous-default-export */
import {CREATE_PDF} from './constants'

const initialState = {
  pdfs: [],
  meta_data: {sum_rows:0},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PDF: {
      return {
        ...state,
        pdfs: action.payload.pdfs,
        meta_data: action.payload.meta_data,
      }
    }

    default:
      return state
  }
}
