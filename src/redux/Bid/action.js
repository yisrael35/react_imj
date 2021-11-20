import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'

export const create_new_bid = (data) =>  (dispatch) => {
  console.log(data);
  axios
    .post(process.env.REACT_APP_REST_IMJ_URL + `/bid`, data)
    .then((res) => {
      dispatch(actionSnackBar.setSnackBar('success', 'create successfully', 2000))
      console.log(res.data.bid_id)
  
    })
    .catch((error) => {
      dispatch(actionSnackBar.setSnackBar('error', error.response.statusText, 3000))
    })
}
