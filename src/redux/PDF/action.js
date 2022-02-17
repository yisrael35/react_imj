import { CREATE_PDF } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const create_pdf = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/pdf`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'create client successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
