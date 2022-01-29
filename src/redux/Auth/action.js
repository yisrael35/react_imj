import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOADING_INDICATOR_AUTH } from './constants'
import axios from 'axios'
import { setAuthToken } from '../../utils/constans'
import * as actionSnackBar from '../SnackBar/action'
import jwtDecode from 'jwt-decode'
const words_he = require('../../utils/words_he').words_he

export const login = (username, password) => async (dispatch, getState) => {
  try {
    const response = await axios.put(process.env.REACT_APP_REST_IMJ_URL + '/auth', { username, password })
    setAuthToken(response.data.token) // Set token to Axios default header.
    //store user data and token
    localStorage.setItem('UserName', response.data.user.name)
    localStorage.setItem('UserLevel', response.data.user.level)
    localStorage.setItem('UserId', response.data.user.id)
    localStorage.setItem('TokenAccess', response.data.token)
    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
  } catch (error) {
    console.log(error)
    dispatch(actionSnackBar.setSnackBar('error', `${words_he['login_error']}`, 3000))

  }
}

export const check_if_token_exist = (token) => async (dispatch) => {
  try {
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.removeItem('TokenAccess')
      return
    }

    const name = localStorage.getItem('UserName')
    const level = localStorage.getItem('UserLevel')
    const id = localStorage.getItem('UserId')
    const user_data = { user: { name, level: Number(level), id }, token }
    setAuthToken(token) // Set token to Axios default header.
    dispatch({ type: LOGIN_SUCCESS, payload: user_data })
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    const response = await axios.delete(process.env.REACT_APP_REST_IMJ_URL + '/auth')
    setAuthToken() // Set '' to Axios default header.
    localStorage.removeItem('TokenAccess')
    dispatch({ type: LOGOUT_SUCCESS, payload: response })
  } catch (error) {
    console.log(error)
  }
}

export const forgotPassword = (username) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { username })
    .then((res) => {
      // console.log(res.data)
      dispatch(actionSnackBar.setSnackBar('success', 'Sent to email successfully', 2000))
    })
    .catch((error) => {
      // console.log(error.response)
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const reset_password = (password, token) => (dispatch) => {
  dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: true })
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { password }, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => {
      console.log(res)
      dispatch(actionSnackBar.setSnackBar('success', res.statusText, 2000))
      setTimeout(redirect_to_home, 2000)
    })
    .catch((error) => {
      console.log(error.response)
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
      dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: false })
      setTimeout(redirect_to_home, 3000)
    })
}

const redirect_to_home = () => {
  let host = window.location.hostname
  if (host === 'localhost') {
    window.location.replace('http://' + host + ':3000')
  } else {
    window.location.replace('https://' + host)
  }
}
