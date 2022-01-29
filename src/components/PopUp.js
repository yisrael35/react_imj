import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action_popUp from '../redux/PopUp/action'

const Popup = (props) => {
  const pop_up_visible = useSelector((state) => state.popUp.visible)
  const pop_up_content = useSelector((state) => state.popUp.content)
  const dispatch = useDispatch()
  const handle_close = () => {
    dispatch(action_popUp.disablePopUp())
  }

  if (pop_up_visible) {
    return (
      <div className='popup-box'>
        <div className='box'>
          <span className='close-icon' onClick={handle_close}>
            x
          </span>
          <span style={{ lineHeight: '2', display: 'inline-block', verticalAlign: 'middle' }}>{pop_up_content}</span>
        </div>
      </div>
    )
  } else {
    return <span></span>
  }
}

export default Popup
