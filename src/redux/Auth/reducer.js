/* eslint-disable import/no-anonymous-default-export */
import { PLATFORM_TOKEN_SUCCESS, LOGIN_TOKEN_SUCCESS, LOGOUT_SUCCESS, UPDATE_TWO_FA_STATUS, UPDATE_TYPE } from './constants'

const initialState = {
  token: '',
  permissions: 0,
  userContent: {},
  isAuthenticated: false,
  currentRoute: window.location.pathname || '/Home',
  type: '',
  language: 'en',
  language_direction: 'rtl',
  phone: undefined,
  email: undefined,
  two_fa_status: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLATFORM_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userContent: action.payload.user,
        permissions: action.payload.user.level,
        type: action.payload.type,
        two_fa_status: action.payload.two_fa_status === 'true' || action.payload.two_fa_status === true ? true : false,
      }
    }
    case LOGIN_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload.token,
        userContent: action.payload.user,
        permissions: action.payload.user.level,
        type: action.payload.type,
        phone: action.payload.phone,
        email: action.payload.email,
      }
    }
    case UPDATE_TWO_FA_STATUS: {
      return {
        ...state,
        two_fa_status: action.payload.two_fa_status,
      }
    }
    case UPDATE_TYPE: {
      return {
        ...state,
        type: action.payload.type,
      }
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        userContent: {},
        currentRoute: '/Login',
        isAuthenticated: false,
      }
    default:
      return state
  }
}
