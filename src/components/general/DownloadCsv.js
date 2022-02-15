import React from 'react'
const words_he = require('../../utils/words_he').words_he

const DownloadCsv = (props) => {
  const file_name = props.file_name
  const url = process.env.REACT_APP_REST_IMJ_URL
  const file_path = `${url}/assets/${file_name}`

  return (
    <div>
      <a href={file_path}>
        <button className='w-45 btn m-2 btn-primary' disabled={!file_name}>
          {words_he['download_file']}
        </button>
      </a>
    </div>
  )
}

export default DownloadCsv
