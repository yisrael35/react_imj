import { SET_LOADING, DISABLE_LOADING } from './constants'

export const disableLoading = () => (dispatch) => {
  dispatch({ type: DISABLE_LOADING })
}

export const setLoading = (content) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: content })
}
