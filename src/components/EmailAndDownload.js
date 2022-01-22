import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as action_event_type from '../redux/EventType/action'

const EmailAndDownload = (props) => {
  const { message, bid_id, event_id } = props
  const [clientEmail, setClientEmail] = useState('')

  const dispatch = useDispatch()
  const handle_send_email = () => {
    //TODO
    dispatch(action_event_type.get_events_type({ bid_id, event_id },clientEmail))
    console.log('im in send email')
  }
  const handle_get_pdf = () => {
    //TODO
    dispatch(action_event_type.get_events_type({ bid_id, event_id }))
    console.log('im in get pdf')
  }

  return (
    <div>
      <div>{message}</div>
      <div>
        <label>
          <input
            type='email'
            placeholder={'example@gmail.com'}
            onChange={(e) => {
              setClientEmail(e.target.value)
            }}
          />
        </label>
        <button type='button' className='btn btn-info' onClick={handle_send_email}>
          send email
        </button>
      </div>
      <button type='button' className='btn btn-info' onClick={handle_get_pdf}>
        download pdf file
      </button>
    </div>
  )
}

export default EmailAndDownload
