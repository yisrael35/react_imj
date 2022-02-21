import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as action_event_type from '../../redux/EventType/action'
import * as action_pdf from '../../redux/PDF/action'
import { FaRegFilePdf } from 'react-icons/fa'

const EmailAndDownload = (props) => {
  const { message, bid_id, event_id, email } = props
  const [clientEmail, setClientEmail] = useState(email)
  const [send_to_email, setSendToEmail] = useState(false)

  const dispatch = useDispatch()
  const handle_send_email = () => {
    const data = {
      bid_id: bid_id,
      email: clientEmail,
    }
    dispatch(action_pdf.create_pdf(data))
    // dispatch(action_event_type.get_events_type({ bid_id, event_id }, clientEmail))
  }
  const handle_get_pdf = () => {
    //TODO
    dispatch(action_event_type.get_events_type({ bid_id, event_id }))
  }

  const handle_send_to = () => {
    setSendToEmail(!send_to_email)
  }

  return (
    <div>
      {/*  */}
      <div>{message}</div>
      <FaRegFilePdf style={{ fontSize: '160px', margin: '4px' }} />
      <table>
        <tbody>
          <tr>
            {!send_to_email ? (
              <td>
                <button type='button' className='btn btn-info m-4' onClick={handle_get_pdf}>
                  download pdf file
                </button>
              </td>
            ) : (
              <td> </td>
            )}
            <td>
              <button type='button' className='btn btn-info m-4' onClick={handle_send_to}>
                send to email
              </button>
            </td>
            {send_to_email ? (
              <td>
                <label>
                  <input
                    type='email'
                    placeholder={email ? email : 'example@gmail.com'}
                    onChange={(e) => {
                      setClientEmail(e.target.value)
                    }}
                  />
                </label>
                <button type='button' className='btn btn-info m-4' onClick={handle_send_email}>
                  send
                </button>
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default EmailAndDownload
