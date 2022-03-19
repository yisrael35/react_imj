import axios from 'axios'
import * as actionSnackBar from '../SnackBar/action'
import * as actionLoading from '../Loading/action'
import * as actionPopUp from '../PopUp/action'
import DownloadFile from '../../components/general/DownloadFile'

const words_he = require('../../utils/words_he').words_he

export const create_pdf =
  ({ data, download }) =>
  (dispatch) => {
    axios
      .post(process.env.REACT_APP_REST_IMJ_URL + `/pdf`, data)
      .then((res) => {

        if (download && res.data.file_name) {
          dispatch(actionLoading.disableLoading())
          const file_name = res.data.file_name
          const content = <DownloadFile file_name={file_name} />
          dispatch(actionPopUp.setPopUp(content))
        }
        dispatch(actionSnackBar.setSnackBar('success', 'create client successfully', 2000))
      })
      .catch((error) => {
        // console.log(error.response.data)
        dispatch(actionLoading.disableLoading())
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['server_error']} ${words_he['failed_load_data']}`, 3000))
      })
  }
