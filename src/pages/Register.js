import React, { useState, useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'

import { useDispatch } from 'react-redux'
import * as userActions from '../redux/User/action'
import * as actionSnackBar from '../redux/SnackBar/action'

import Dictionary from '../utils/dictionary'
const { invalid_email_characters, invalid_phone, all_fields_filled } = require('../utils/validate_helper')

const Register = () => {
  const dispatch = useDispatch()
  const dictionary = Dictionary()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first_name, last_name, email, phone])

  const validate_fields = () => {
    if (email && invalid_email_characters(email + '@imj.org.il')) {
      dispatch(actionSnackBar.setSnackBar('error', `${dictionary['invalid_character']} ${email} `, 3000))
      return false
    }
    if (phone && invalid_phone(phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${dictionary['type_number']} ${phone} `, 3000))
      return false
    }
    if (all_fields_filled([first_name, email, last_name, phone])) {
      return true
    }
    return false
  }

  const submit = async (e) => {
    e.preventDefault()

    const data = {
      username: email,
      first_name,
      last_name,
      email: email + process.env.REACT_APP_IMJ_EMAIL,
      phone,
      password: process.env.REACT_APP_FIRST_USER_PASSWORD,
    }
    dispatch(userActions.create_user(data))
  }

  return (
    <form onSubmit={submit} className='form-signin'>
      <h1 className='h3 mb-3 fw-normal'> {dictionary['create_new_user']}</h1>
      <FaUserPlus style={{ fontSize: '60px', margin: '10px', textAlign: 'center' }} />
      <div style={{ textAlign: 'center' }}>
        <input style={{ textAlign: 'center' }} className='form-control' placeholder={dictionary['first_name']} required onChange={(e) => setFirstName(e.target.value)} />
        <input style={{ textAlign: 'center' }} className='form-control' placeholder={dictionary['last_name']} required onChange={(e) => setLastName(e.target.value)} />
        <input style={{ textAlign: 'center' }} type='text' className='form-control' placeholder={dictionary['phone']} required onChange={(e) => setPhone(e.target.value)} />
        <input
          style={{ textAlign: 'center' }}
          type='text'
          className='form-control'
          placeholder={dictionary['email']}
          required
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div style={{ padding: '6px', direction: 'ltr' }}>{email + process.env.REACT_APP_IMJ_EMAIL} </div>
      <button className='w-100 btn btn-lg btn-success' type='submit' disabled={!enable_send}>
        {dictionary['register']}
      </button>
    </form>
  )
}

export default Register
