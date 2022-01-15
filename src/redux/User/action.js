import { GET_USERS, GET_USER } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_users = (limit, offset, search) => (dispatch) => {
  const query = { limit, offset, search }
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/user', { params: query })
    .then((res) => {
      dispatch({ type: GET_USERS, payload: res.data })
    })
    .catch((error) => {
      console.log(error)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}

export const get_user = () => (dispatch, getState) => {
  const store = getState()
  const user_id = store.auth.userContent.id
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/user/' + user_id)
    .then((res) => {
      const data = {
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        phone: res.data.phone || '',
        password: '',
        confirm_password: '',
      }
      console.log(data)
      dispatch({ type: GET_USER, payload: data })
    })
    .catch((error) => {
      console.log(error)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}

export const delete_user = (user_id) => (dispatch) => {
  axios
    .delete(process.env.REACT_APP_REST_IMJ_URL + `/user/${user_id}`)
    .then((res) => {
      get_users()
      dispatch(actionSnackBar.setSnackBar('success', 'user status changed successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
export const create_user = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/user`, data)
    .then((res) => {
      get_users()
      dispatch(actionSnackBar.setSnackBar('success', 'create user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const update_user = (data) => (dispatch, getState) => {
  const store = getState()
  const user_id = store.auth.userContent.id
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/user/${user_id}`, data)
    .then((res) => {
      get_users()
      dispatch(actionSnackBar.setSnackBar('success', 'update user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const update_user_by_id = (data, user_id) => (dispatch, getState) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/user/${user_id}`, data)
    .then((res) => {
      get_users()
      dispatch(actionSnackBar.setSnackBar('success', 'update user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
