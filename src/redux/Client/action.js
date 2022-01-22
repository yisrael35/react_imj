import { GET_CLIENTS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_clients = (limit, offset, search) => (dispatch) => {
  const query = { limit, offset, search }
  axios
  .get(process.env.REACT_APP_REST_IMJ_URL + '/client', { params: query })
  .then((res) => {
      dispatch({ type: GET_CLIENTS, payload: res.data })
    })
    .catch((error) => {
      console.log(error)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}
export const delete_client = (client_id) => (dispatch) => {
  axios
    .delete(process.env.REACT_APP_REST_IMJ_URL + `/client/${client_id}`)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'client status changed successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
export const create_client = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/client`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'create client successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const update_client = (data, client_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/client/${client_id}`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'update client successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
