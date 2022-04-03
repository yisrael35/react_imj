import { GET_EVENTS_TYPE } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_events_type = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/event_type')
    .then((res) => {
      dispatch({ type: GET_EVENTS_TYPE, payload: res.data })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error',  `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}

export const create_event_type = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/event_type`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', words_he['event_type_created'], 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
