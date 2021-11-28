import { SET_POPUP, DISABLE_POPUP } from './constants'

export const disablePopUp = () => (dispatch) => {
  dispatch({ type: DISABLE_POPUP })
}

export const setPopUp = (content) => (dispatch) => {
  dispatch({ type: SET_POPUP, payload: content })
}
