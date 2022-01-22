import { GET_LOCATIONS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_locations = () => (dispatch) => {
 
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/location')
    .then((res) => {
      let locations = []
      let counter = 0;
      if (res.data) {
        for (const location of res.data) {
          locations.push({value: location.id,  label: location.name_he, id: counter})
          counter++        
        }
      }
      dispatch({ type: GET_LOCATIONS, payload: locations })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}

