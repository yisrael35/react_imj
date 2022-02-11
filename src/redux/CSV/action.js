import axios from 'axios'
import { GET_CSV, DELETE_CSV } from './constants'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_table =
  ({ from_date, to_date, table }) =>
  (dispatch) => {
    const query = { from_date, to_date, table }

    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/csv', { params: query })
      .then((res) => {
        console.log(res.data.file_name)

        dispatch({ type: GET_CSV, payload: res.data })
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
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
