import { GET_LOCATIONS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'

export const get_locations = () => (dispatch) => {
 
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/location')
    .then((res) => {
      let locations = []
      if (res.data) {
        for (const location of res.data) {
          locations.push({value: location.id,  label: location.name_he})
        }
      }
      dispatch({ type: GET_LOCATIONS, payload: locations })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

