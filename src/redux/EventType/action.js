import { GET_EVENTS_TYPE } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'

export const get_events_type = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/event_type')
    .then((res) => {
      dispatch({ type: GET_EVENTS_TYPE, payload: res.data })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

