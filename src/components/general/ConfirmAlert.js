import React from 'react'
import * as action_popUp from '../../redux/PopUp/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const words_he = require('../../utils/words_he').words_he

const ConfirmAlert = (props) => {
  const dispatch = useDispatch()

  const handle_click = () => {
    dispatch(action_popUp.disablePopUp())
  }

  return (
    <div>
      <div>{props.message} </div>
      <button className='btn btn-lg btn-success m-2' onClick={handle_click}>
        {words_he['no']}
      </button>
      <Link to='/Home'>
        <button className='btn btn-lg btn-danger m-2' onClick={handle_click}>
          {words_he['yes']}
        </button>
      </Link>
    </div>
  )
}

export default ConfirmAlert
