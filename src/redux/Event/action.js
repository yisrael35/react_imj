import axios from 'axios'
import moment from 'moment'
import { GET_EVENTS } from './constants'
import * as actionSnackBar from '../SnackBar/action'
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
  ({ limit, offset, search, from_date, to_date }) =>
  (dispatch) => {
    const query = { limit, offset, search, from_date, to_date }
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/event', { params: query })
      .then((res) => {
        const events = []
        for (const event of res.data.events) {
          events.push({
            ...event,
            from_date: moment(event.from_date).format('YYYY-MM-DD hh:mm:ss'),
            to_date: moment(event.to_date).format('YYYY-MM-DD hh:mm:ss'),
          })
        }
        res.data.events = events

        dispatch({ type: GET_EVENTS, payload: res.data })
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

export const update_event_by_id = (data, event_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/event/${event_id}`, data)
    .then((res) => {
      get_events()
      dispatch(actionSnackBar.setSnackBar('success', 'update user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
