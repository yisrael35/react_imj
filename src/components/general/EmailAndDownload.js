import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import * as action_event_type from '../../redux/EventType/action'
import * as action_pdf from '../../redux/PDF/action'
import * as action_loading from '../../redux/Loading/action'
import * as action_popUp from '../../redux/PopUp/action'

import { FaRegFilePdf } from 'react-icons/fa'
import '../../css/toggle.css'
const words_he = require('../../utils/words_he').words_he

const EmailAndDownload = (props) => {
  const { message, bid_id, email } = props
  // console.log({ message, bid_id, event_id, email })
  const [clientEmail, setClientEmail] = useState(email)
  const [send_to_email, setSendToEmail] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // TODO -- REGEX - EMAIL
    //  TODO -- MOVE REGEX TO GLOBAL PLACE
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientEmail])

  // console.log({ bid_uuid })
  const handle_send_email = () => {
    const data = {
      bid_id,
      email: clientEmail,
    }
    dispatch(action_pdf.create_pdf({ data, download: false }))
  }
  const toggle_buttons = () => {
    setSendToEmail(!send_to_email)
  }

  const handle_get_pdf = () => {
    //TODO
    setSendToEmail(false)
    dispatch(action_popUp.disablePopUp())
    dispatch(action_loading.setLoading())
    const pdf_req = { bid_id }
    dispatch(action_pdf.create_pdf({ data: pdf_req, download: true }))
  }

  return (
    <div>
      {/*  */}

      <div>{message}</div>
      <FaRegFilePdf style={{ fontSize: '160px', margin: '4px' }} />

      <div className='mt-3'>
        <button type='button' className='btn btn-dark border' onClick={toggle_buttons} disabled={!send_to_email}>
          {words_he['download_pdf']}
        </button>
        <button type='button' className='btn btn-dark border' onClick={toggle_buttons} disabled={send_to_email}>
          {words_he['send_to_email']}
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      {send_to_email ? (
        <span>
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
            {words_he['send']}
          </button>
        </span>
      ) : (
        <span>
          <button type='button' className='btn btn-info m-4' onClick={handle_get_pdf} disabled={false}>
            {words_he['create_pdf']}
          </button>
        </span>
      )}
    </div>
  )
}

export default EmailAndDownload
