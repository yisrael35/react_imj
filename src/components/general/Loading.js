import React from 'react'
import { useSelector } from 'react-redux'
import '../../css/loading.css'

const Loading = (props) => {
  const loading_visible = useSelector((state) => state.loading.visible)
  if (loading_visible) {
    return (
      <div className='loading'>
        <div id='load'>
          {/* <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
        <div>L</div> */}
          <div>{'ט'}</div>
          <div>{'ו'}</div>
          <div>{'ע'}</div>
          <div>{'ן'}</div>
        </div>
      </div>
    )
  } else {
    return <span></span>
  }
}

export default Loading
