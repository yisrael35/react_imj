import axios from 'axios'
import { DELETE_CSV } from './constants'
import * as actionSnackBar from '../SnackBar/action'
import * as actionPopUp from '../PopUp/action'
import * as actionLoading from '../Loading/action'

import DownloadFile from '../../components/general/DownloadFile'

const words_he = require('../../utils/words_he').words_he

export const get_table =
  ({ from_date, to_date, table }) =>
  (dispatch) => {
    const query = { from_date, to_date, table }

    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/csv', { params: query })
      .then((res) => {
        if (res.data.file_name) {
          const file_name = res.data.file_name
          const content = <DownloadFile file_name={file_name} />
          dispatch(actionPopUp.setPopUp(content))
        }
      })
      .catch((error) => {
        console.log(error.response)
        dispatch(actionLoading.disableLoading())
        if (error.response.status === 404) {
          dispatch(actionSnackBar.setSnackBar('error', ` ${words_he['code_404']}`, 3000))
        } else {
          dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
        }
      })
  }

export const delete_file = (file_name) => async (dispatch) => {
  try {
    await axios
      .delete(process.env.REACT_APP_REST_IMJ_URL + `/csv/${file_name}`)
      .then((res) => {
        dispatch({ type: DELETE_CSV, payload: {} })
      })
      .catch((error) => {
        dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
      })
  } catch (error) {
    console.log(error)
  }
}
