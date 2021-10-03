import { SET_SNACKBAR, DISABLE_SNACKBAR } from './constants'

let timeoutInstance = null

export const disableSnackBar = () => (dispatch) => {
  dispatch({ type: DISABLE_SNACKBAR })
  clearTimeout(timeoutInstance)
}

export const setSnackBar =
  (type, message, timeout = 2000) =>
  (dispatch) => {
    dispatch({ type: SET_SNACKBAR, payload: { type, message, timeout } })
    timeoutInstance = setTimeout(() => {
      dispatch({ type: DISABLE_SNACKBAR })
    }, timeout)
  }
