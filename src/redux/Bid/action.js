import axios from 'axios'
import { GET_BIDS } from './constants'

import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const create_new_bid = (data) => (dispatch) => {
  // console.log(data);
  return new Promise(async (resolve, reject) => {
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + `/bid`, data)
      .then((res) => {
        dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
        // console.log(res.data.bid_id)
        return resolve(res.data.bid_id)
      })
      .catch((error) => {
        dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
        return reject(undefined)
      })
  })
}

export const get_bids = (limit, offset, search) => (dispatch) => {
  const query = { limit, offset, search }
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/bid', { params: query })
    .then((res) => {
      dispatch({ type: GET_BIDS, payload: res.data })
    })
    .catch((error) => {
      console.log(error)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}
