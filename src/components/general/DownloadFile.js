import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action_loading from '../../redux/Loading/action'
import { FaCloudDownloadAlt } from 'react-icons/fa'

import Dictionary from '../../utils/dictionary'

const DownloadFile = (props) => {
  const file_name = props.file_name
  const url = process.env.REACT_APP_REST_IMJ_URL
  const file_path = `${url}/assets/${file_name}`

  const dictionary = Dictionary()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_loading.disableLoading())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h3 className='text-muted'> {dictionary['download_file_title']}</h3>
      <FaCloudDownloadAlt style={{ fontSize: '100px', margin: '14px' }} />

      <div className='AiOutlineDownload'></div>
      <a href={file_path}>
        <button className='w-45 btn m-2 btn-success' disabled={!file_name}>
          {dictionary['download_file']}
        </button>
      </a>
    </div>
  )
}

export default DownloadFile
