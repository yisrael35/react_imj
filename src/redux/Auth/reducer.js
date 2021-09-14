import { LOGIN_SUCCESS } from './constants'

const initialState = {
  token: '',
  isAuthenticated: false,
  userContent: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userContent: action.payload.user,
      }
    }
    default:
      return state
  }
}
