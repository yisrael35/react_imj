/* eslint-disable import/no-anonymous-default-export */
import { SET_LOADING, DISABLE_LOADING } from './constants'

const initialState = {
  visible: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        visible: true,
      }
    case DISABLE_LOADING:
      return {
        ...state,
        visible: false,
      }
    default:
      return state
  }
}
