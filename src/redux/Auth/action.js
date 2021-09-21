import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOADING_INDICATOR_AUTH } from './constants'
import axios from 'axios'
import { setAuthToken } from '../../utils/constans'
import * as actionSnackBar from '../SnackBar/action'

export const login = (username, password) => async (dispatch, getState) => {
  try {
    const response = await axios.put(process.env.REACT_APP_REST_IMJ_URL + '/auth', { username, password })
    setAuthToken(response.data.token) // Set token to Axios default header.
    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    const response = await axios.delete(process.env.REACT_APP_REST_IMJ_URL + '/auth')
    setAuthToken() // Set '' to Axios default header.
    dispatch({ type: LOGOUT_SUCCESS, payload: response })
  } catch (error) {
    console.log(error)
  }
}

export const forgotPassword = (username) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { username })
    .then((res) => {
      console.log(res.data)
      dispatch(actionSnackBar.setSnackBar('success', 'Sent to email successfully', 2000))
    })
    .catch((error) => {
      console.log(error.response.data.message)
      dispatch(actionSnackBar.setSnackBar('error', error.response.data.message, 3000))
    })
}

export const reset_password = (password, token) => (dispatch) => {
  dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: true })
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { password }, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => {
      console.log(res.data)
      dispatch(actionSnackBar.setSnackBar('success', res.data.message, 2000))
      let host = window.location.hostname
      if (host === 'localhost') {
        window.location.replace('http://' + host + ':3000')
      } else {
        window.location.replace('https://' + host)
      }
    })
    .catch((error) => {
      console.log(error.response.data.message)
      dispatch(actionSnackBar.setSnackBar('error', error.response.data.message, 3000))
      dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: false })
    })
}

// export const changePassword = (current_password, new_password, callBack) => (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   }
//   axios
//     .put(process.env.REACT_APP_REST_IMJ_URL + '/password_change', qs.stringify({ old_password: current_password, new_password, new_password_retype: new_password }), config)
//     .then((res) => {
//       dispatch(actionSnackBar.setSnackBar('success', res.data.message, 2000))
//       callBack()
//     })
//     .catch((error) => {
//       console.log(error.response.data.message)
//       dispatch(actionSnackBar.setSnackBar('error', error.response.data.message, 3000))
//       callBack()
//     })
// }
