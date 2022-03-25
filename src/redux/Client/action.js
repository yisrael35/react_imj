import { GET_CLIENTS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
import * as actionPopUp from '../PopUp/action'
import * as actionLoading from '../Loading/action'

import DownloadFile from '../../components/general/DownloadFile'

const words_he = require('../../utils/words_he').words_he

export const get_clients =
  ({ limit, offset, search, csv }) =>
  (dispatch) => {
    const query = { limit, offset, search, csv }
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/client', { params: query })
      .then((res) => {
        if (res.data.file_name) {
          const file_name = res.data.file_name
          const content = <DownloadFile file_name={file_name} />
          dispatch(actionPopUp.setPopUp(content))
        } else {
          dispatch({ type: GET_CLIENTS, payload: res.data })
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionLoading.disableLoading())
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
      })
  }
export const delete_client = (client_id) => (dispatch) => {
  axios
    .delete(process.env.REACT_APP_REST_IMJ_URL + `/client/${client_id}`)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', words_he['client_deleted'], 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
export const create_client = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/client`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', words_he['client_created'], 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const update_client = (data, client_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/client/${client_id}`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success',  words_he['client_updated'], 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
