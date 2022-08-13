import { PLATFORM_TOKEN_SUCCESS, LOGIN_TOKEN_SUCCESS, LOGOUT_SUCCESS, UPDATE_TWO_FA_STATUS, UPDATE_TYPE, UPDATE_LANGUAGE } from './constants'
import axios from 'axios'
import { setAuthToken } from '../../utils/constans'
import * as actionSnackBar from '../SnackBar/action'
import jwtDecode from 'jwt-decode'
const words_he = require('../../utils/words_he').words_he

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.put(process.env.REACT_APP_REST_IMJ_URL + '/auth', { username, password })
    setAuthToken(response.data.token) // Set token to Axios default header.
    //store user data and token
    localStorage.setItem('type', response.data.type)
    localStorage.setItem('UserName', response.data.user.name)
    localStorage.setItem('UserLevel', response.data.user.level)
    localStorage.setItem('UserId', response.data.user.id)
    localStorage.setItem('TokenAccess', response.data.token)
    localStorage.setItem('two_fa_status', response.data.two_fa_status)

    if (response.data.type === 'platform') {
      dispatch({ type: PLATFORM_TOKEN_SUCCESS, payload: response.data })
    } else if (response.data.type === 'login') {
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('phone', response.data.phone)
      dispatch({ type: LOGIN_TOKEN_SUCCESS, payload: response.data })
    }
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

    const type = localStorage.getItem('type')
    const name = localStorage.getItem('UserName')
    const level = localStorage.getItem('UserLevel')
    const id = localStorage.getItem('UserId')
    const two_fa_status = localStorage.getItem('two_fa_status')
    const email = localStorage.getItem('email')
    const phone = localStorage.getItem('phone')

    const user_data = { user: { name, level: Number(level), id }, type, token, two_fa_status, email, phone }
    setAuthToken(token) // Set token to Axios default header.
    if (type === 'platform') {
      dispatch({ type: PLATFORM_TOKEN_SUCCESS, payload: user_data })
    } else if (type === 'login') {
      dispatch({ type: LOGIN_TOKEN_SUCCESS, payload: user_data })
    }
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS })
    await axios.delete(process.env.REACT_APP_REST_IMJ_URL + '/auth').catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['logout_success']}`, 3000))
    })
    setAuthToken() // Set '' to Axios default header.
    localStorage.removeItem('TokenAccess')
  } catch (error) {
    console.log(error)
  }
}

export const forgotPassword = (username) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { username })
    .then((res) => {
      // console.log(res.data)
      dispatch(actionSnackBar.setSnackBar('success', `${words_he['email_success']}`, 2000))
    })
    .catch((error) => {
      // console.log(error.response)
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const reset_password = (password, token) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { password }, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => {
      console.log(res)
      dispatch(actionSnackBar.setSnackBar('success', `${words_he['reset_password_success']}`, 2000))
      setTimeout(redirect_to_home, 2000)
    })
    .catch((error) => {
      console.log(error.response)
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
      setTimeout(redirect_to_home, 3000)
    })
}

export const update_2fa_status = (two_fa_status) => async (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + '/auth/two_fa', { two_fa_status })
    .then((res) => {
      const status = res.data.two_fa_status === 'true' || res.data.two_fa_status === true ? true : false
      dispatch({ type: UPDATE_TWO_FA_STATUS, payload: { two_fa_status: status } })
      dispatch(actionSnackBar.setSnackBar('success', `${words_he['update_2fa_success']}`, 2000))
    })
    .catch((error) => {
      // console.log(error.response)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['update_2fa_failed']}`, 3000))
    })
}

export const update_type = (type) => async (dispatch) => {
  dispatch({ type: UPDATE_TYPE, payload: { type } })
}
export const update_language = (language, language_direction) => async (dispatch) => {
  dispatch({ type: UPDATE_LANGUAGE, payload: { language, language_direction } })
}

export const send_six_digits_to =
  ({ send_code_to }) =>
  async (dispatch) => {
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + '/auth/send_six_digits', { send_code_to })
      .then((res) => {
        // console.log(res.data)

        dispatch(actionSnackBar.setSnackBar('success', `${words_he['six_digits_sent_success']}`, 2000))
      })
      .catch((error) => {
        // console.log(error.response)
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['six_digits_sent_failed']}`, 3000))
      })
  }

export const validate_six_digits =
  ({ code }) =>
  async (dispatch) => {
    axios
      .put(process.env.REACT_APP_REST_IMJ_URL + '/auth/validate_six_digits', { code })
      .then((response) => {
        // console.log(res.data)
        setAuthToken(response.data.token) // Set token to Axios default header.
        //store user data and token
        localStorage.setItem('type', response.data.type)
        localStorage.setItem('UserName', response.data.user.name)
        localStorage.setItem('UserLevel', response.data.user.level)
        localStorage.setItem('UserId', response.data.user.id)
        localStorage.setItem('TokenAccess', response.data.token)
        localStorage.setItem('two_fa_status', response.data.two_fa_status)

        if (response.data.type === 'platform') {
          dispatch({ type: PLATFORM_TOKEN_SUCCESS, payload: response.data })
        } else if (response.data.type === 'login') {
          dispatch({ type: LOGIN_TOKEN_SUCCESS, payload: response.data })
        }
      })
      .catch((error) => {
        // console.log(error.response)
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['six_digits_validation_failed']}`, 3000))
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
