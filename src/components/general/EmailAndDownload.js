import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as action_pdf from '../../redux/PDF/action'
import * as action_loading from '../../redux/Loading/action'
import * as action_popUp from '../../redux/PopUp/action'

import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material/'

import { FaRegFilePdf } from 'react-icons/fa'

import Dictionary from '../../utils/dictionary'

const { validateEmail } = require('../../utils/validate_helper')

const EmailAndDownload = (props) => {
  const { message, bid_id, email } = props
  const [client_email, setClientEmail] = useState(email)
  const [email_valid, setEmailValid] = useState(true)
  const [toggle_file, setToggleFile] = useState('download_pdf')

  const dictionary = Dictionary()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!validateEmail(client_email)) {
      setEmailValid(false)
    } else {
      setEmailValid(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client_email])

  const handle_send_email = () => {
    const data = {
      bid_id,
      email: client_email,
    }
    dispatch(action_pdf.create_pdf({ data, download: false }))
  }
  const toggle_buttons = (event, name) => {
    setToggleFile(name)
  }

  const handle_get_pdf = () => {
    dispatch(action_popUp.disablePopUp())
    dispatch(action_loading.setLoading())
    const pdf_req = { bid_id }
    dispatch(action_pdf.create_pdf({ data: pdf_req, download: true }))
  }

  return (
    <div>
      <h4 className='text-muted  m-4'>{message}</h4>
      <FaRegFilePdf style={{ fontSize: '160px', margin: '4px' }} />
      <div className='mt-3'>
        <ToggleButtonGroup color='primary' value={toggle_file} exclusive onChange={toggle_buttons}>
          <ToggleButton value='download_pdf'> {dictionary['download_pdf']}</ToggleButton>
          <ToggleButton value='send_to_email'> {dictionary['send_to_email']}</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <table>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      {toggle_file === 'send_to_email' ? (
        <div style={{ margin: '18px' }}>
          <TextField
            required
            id='standard-required'
            label={dictionary['email']}
            variant='standard'
            placeholder={email ? email : 'example@gmail.com'}
            value={client_email}
            onChange={(e) => {
              setClientEmail(e.target.value)
            }}
          />
          <button type='button' className='btn btn-success m-2' disabled={!email_valid} onClick={handle_send_email}>
            {dictionary['send']}
          </button>
        </div>
      ) : (
        <span>
          <button type='button' className='btn btn-success m-4' onClick={handle_get_pdf} disabled={false}>
            {dictionary['create_pdf']}
          </button>
        </span>
      )}
    </div>
  )
}

export default EmailAndDownload
