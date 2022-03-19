import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as userActions from '../redux/User/action'
import * as actionSnackBar from '../redux/SnackBar/action'
import { FaUserPlus } from 'react-icons/fa'

const { invalid_email_characters_prefix, invalid_phone, all_fields_filled } = require('../utils/validate_helper')
const words_he = require('../utils/words_he').words_he

const Register = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enable_send, setEnableSend] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first_name, last_name, email, phone])

  const validate_fields = () => {
    if (email && invalid_email_characters_prefix(email)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['invalid_character']} ${email} `, 3000))
      return false
    }
    if (phone && invalid_phone(phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${phone} `, 3000))
      return false
    }
    // if (first_name.trim() !== '' && email.trim() !== '' && last_name.trim() !== '' && phone.trim() !== '') {
    //   return true
    // }
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
      <h1 className='h3 mb-3 fw-normal'> {words_he['create_new_user']}</h1>
      <FaUserPlus style={{ fontSize: '60px', margin: '10px', textAlign: 'center' }} />

      <input className='form-control' placeholder={words_he['first_name']} required onChange={(e) => setFirstName(e.target.value)} />
      <input className='form-control' placeholder={words_he['last_name']} required onChange={(e) => setLastName(e.target.value)} />
      <input type='text' className='form-control' placeholder={words_he['phone']} required onChange={(e) => setPhone(e.target.value)} />
      <input
        type='text'
        className='form-control'
        placeholder={words_he['email']}
        required
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <div style={{ padding: '6px', direction: 'ltr' }}>{email + process.env.REACT_APP_IMJ_EMAIL} </div>
      <button className='w-100 btn btn-lg btn-success' type='submit' disabled={!enable_send}>
        {words_he['register']}
      </button>
    </form>
  )
}

export default Register
