import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'

export const create_event = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/event`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
