import { GET_USERS, GET_USER } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
import { useSelector } from 'react-redux'
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

export const get_user = () => (dispatch) => {
  const userContent = useSelector((state) => state.auth.userContent)
  console.log(userContent)
  const { id: user_id } = userContent
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/user/' + user_id)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data })
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

export const update_user = (data, id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/user/${id}`, data)
    .then((res) => {
      get_users()
      dispatch(actionSnackBar.setSnackBar('success', 'update user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
