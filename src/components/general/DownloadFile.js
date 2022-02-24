import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action_loading from '../../redux/Loading/action'
import { FaCloudDownloadAlt } from 'react-icons/fa'

const words_he = require('../../utils/words_he').words_he

const DownloadFile = (props) => {
  const file_name = props.file_name
  const url = process.env.REACT_APP_REST_IMJ_URL
  const file_path = `${url}/assets/${file_name}`

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_loading.disableLoading())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <FaCloudDownloadAlt style={{ fontSize: '70px', margin: '4px' }} />

      <div className='AiOutlineDownload'></div>
      <a href={file_path}>
        <button className='w-45 btn m-2 btn-success' disabled={!file_name}>
          {words_he['download_file']}
        </button>
      </a>
    </div>
  )
}

export default DownloadFile
