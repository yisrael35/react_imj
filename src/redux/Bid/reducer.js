/* eslint-disable import/no-anonymous-default-export */
import { NEW_BID } from './constants'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_BID: {
      return {
        ...state,
      }
    }

    default:
      return state
  }
}
