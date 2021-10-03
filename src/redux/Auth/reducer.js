/* eslint-disable import/no-anonymous-default-export */
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOADING_INDICATOR_AUTH } from './constants'

const initialState = {
  token: '',
  permissions: 0,
  userContent: {},
  isAuthenticated: false,
  loadingIndicator: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userContent: action.payload.user,
        permissions: action.payload.user.level,
      }
    }
    case SET_LOADING_INDICATOR_AUTH:
      return {
        ...state,
        permissions: 0,
        loadingIndicator: action.payload,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        userContent: {},
        isAuthenticated: false,
      }

    default:
      return state
  }
}
