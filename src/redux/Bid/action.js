import axios from 'axios'
import moment from 'moment'
import { GET_BIDS } from './constants'
import * as actionSnackBar from '../SnackBar/action'
import * as actionPopUp from '../PopUp/action'
import * as actionLoading from '../Loading/action'
import DownloadFile from '../../components/general/DownloadFile'

const words_he = require('../../utils/words_he').words_he

export const create_new_bid = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + `/bid`, data)
      .then((res) => {
        dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
        return resolve(res.data.bid_id)
      })
      .catch((error) => {
        dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
        return resolve(undefined)
      })
  })
}

export const create_schedule_event = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    console.log(data)
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + `/schedule_event`, data)
      .then((res) => {
        dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
        return resolve(res.status)
      })
      .catch((error) => {
        dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
        return resolve(undefined)
      })
  })
}

export const create_costs = (data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + `/cost`, data)
      .then((res) => {
        dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
        return resolve(res.status)
      })
      .catch((error) => {
        dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
        return resolve(undefined)
      })
  })
}

export const get_bids =
  ({ limit, offset, search, csv }) =>
  (dispatch) => {
    const query = { limit, offset, search, csv }
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/bid', { params: query })
      .then((res) => {
        if (res.data.file_name) {
          const file_name = res.data.file_name
          const content = <DownloadFile file_name={file_name} />
          dispatch(actionPopUp.setPopUp(content))
        } else if (res.data.bids) {
          const bids = []
          for (const bid of res.data.bids) {
            const bid_data = {
              ...bid,
              language: convert_language(bid.language),
              status: convert_status(bid.status),
              event_date: moment(bid.event_date).format('HH:mm:ss YYYY-MM-DD '),
            }
            bids.push(bid_data)
          }
          res.data.bids = bids

          dispatch({ type: GET_BIDS, payload: res.data })
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(actionLoading.disableLoading())
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
      })
  }

export const get_bid_by_id = (bid_id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(process.env.REACT_APP_REST_IMJ_URL + '/bid/' + bid_id)
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

export const update_bid_by_id = (data, bid_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/bid/${bid_id}`, data)
    .then((res) => {
      get_bids()
      dispatch(actionSnackBar.setSnackBar('success', 'update user successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

const convert_status = (table) => {
  switch (table) {
    case 'draft':
      return words_he['draft']
    case 'sent':
      return words_he['sent']
    case 'approved':
      return words_he['approved']
    default:
      break
  }
}
const convert_language = (table) => {
  switch (table) {
    case 'he':
      return words_he['hebrew']
    case 'en':
      return words_he['english']
    default:
      break
  }
}
