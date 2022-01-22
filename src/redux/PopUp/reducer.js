/* eslint-disable import/no-anonymous-default-export */
import { SET_POPUP, DISABLE_POPUP } from './constants'

const initialState = {
  visible: false,
  content: <span></span>,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POPUP:
      return {
        ...state,
        visible: true,
        content: action.payload,
      }
    case DISABLE_POPUP:
      return {
        ...state,
        visible: false,
      }
    default:
      return state
  }
}
