import { GET_UTILS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'

export const get_utils = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/utils')
    .then((res) => {
      let utils = {locations:[], events_type:[]}
      if (res.data) {
        for (const val of res.data.locations) {
          utils.locations.push({value: val.id,  label: val.name})
        }
        for (const val of res.data.event_type) {
          utils.events_type.push({value: val.id,  label: val.name})
        }
      }
      dispatch({ type: GET_UTILS, payload: utils })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

