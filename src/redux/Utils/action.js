import { GET_UTILS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_utils = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/utils')
    .then((res) => {
      let utils = { locations: [], events_type: [], tables: [] }
      if (res.data) {
        for (const val of res.data.locations) {
          utils.locations.push({ value: val.id, label: val.name })
        }
        for (const val of res.data.event_type) {
          utils.events_type.push({ value: val.id, label: val.name })
        }
        for (const val of res.data.tables) {
          utils.tables.push({ value: val, label: convert_table_name(val) })
        }
      }

      dispatch({ type: GET_UTILS, payload: utils })
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}

const convert_table_name = (table) => {
  switch (table) {
    case 'user':
      return words_he['users']
    case 'client':
      return words_he['clients']
    case 'cost':
      return words_he['costs']
    case 'bid':
      return words_he['bids']
    case 'event':
      return words_he['events']
    case 'supplier':
      return words_he['suppliers']
    case 'event_type':
      return words_he['event_type']
    case 'location':
      return words_he['location']
    case 'schedule_event':
      return words_he['time_schedule_for_event']
    default:
      break
  }
}
