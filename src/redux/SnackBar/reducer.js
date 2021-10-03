/* eslint-disable import/no-anonymous-default-export */
import { SET_SNACKBAR, DISABLE_SNACKBAR } from './constants'

const initialState = {
  visible: false,
  timeout: 3000,
  message: '',
  type: 'success', // error | warning | info | success
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        visible: true,
        timeout: action.payload.timeout,
        message: action.payload.message,
        type: action.payload.type,
      }
    case DISABLE_SNACKBAR:
      return {
        ...state,
        visible: false,
      }
    default:
      return state
  }
}
