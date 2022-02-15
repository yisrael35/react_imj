import axios from 'axios'
import moment from 'moment'
import { GET_EVENTS } from './constants'
import * as actionSnackBar from '../SnackBar/action'
import * as actionPopUp from '../PopUp/action'
import DownloadCsv from '../../components/general/DownloadCsv'

const words_he = require('../../utils/words_he').words_he

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

export const get_events =
  ({ limit, offset, search, from_date, to_date, csv }) =>
  (dispatch) => {
    const query = { limit, offset, search, from_date, to_date, csv }
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/event', { params: query })
      .then((res) => {
        if (res.data.file_name) {
          const file_name = res.data.file_name
          const content = <DownloadCsv file_name={file_name} />
          dispatch(actionPopUp.setPopUp(content))
        } else if (res.data.events) {
          const events = []
          for (const event of res.data.events) {
            events.push({
              ...event,
              from_date: moment(event.from_date).format('YYYY-MM-DD HH:mm:ss'),
              to_date: moment(event.to_date).format('YYYY-MM-DD HH:mm:ss'),
            })
          }
          res.data.events = events

          dispatch({ type: GET_EVENTS, payload: res.data })
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
      })
  }

export const get_event_by_id = (event_id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/event/' + event_id)
      .then((res) => {
        return resolve(res.data)
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
        return reject(error)
      })
  })
}

export const update_event = (data, event_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/event/${event_id}`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'update event successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
