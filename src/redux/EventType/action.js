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

