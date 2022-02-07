import { GET_SUPPLIERS } from './constants'
import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
const words_he = require('../../utils/words_he').words_he

export const get_suppliers = (limit, offset, search) => (dispatch) => {
  const query = { limit, offset, search }
  axios
    .get(process.env.REACT_APP_REST_IMJ_URL + '/Supplier', { params: query })
    .then((res) => {

      for (let i = 0; i < res.data.suppliers.length; i++) {
        if (res.data.suppliers[i].account) {
          let json = JSON.parse(res.data.suppliers[i].account)
          res.data.suppliers[i] = { ...res.data.suppliers[i], account: json }
        }
      }
      
      dispatch({ type: GET_SUPPLIERS, payload: res.data })
    })
    .catch((error) => {
      console.log(error)
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
    })
}
export const delete_supplier = (Supplier_id) => (dispatch) => {
  axios
    .delete(process.env.REACT_APP_REST_IMJ_URL + `/Supplier/${Supplier_id}`)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'Supplier status changed successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
export const create_supplier = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/Supplier`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'create Supplier successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}

export const update_supplier = (data, Supplier_id) => (dispatch) => {
  axios
    .put(process.env.REACT_APP_REST_IMJ_URL + `/Supplier/${Supplier_id}`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'update Supplier successfully', 2000))
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
