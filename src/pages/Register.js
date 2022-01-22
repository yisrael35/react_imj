import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as userActions from '../redux/User/action'
import * as actionSnackBar from '../redux/SnackBar/action'

const words_he = require('../utils/words_he').words_he

const Register = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    if (!/^[a-zA-Z0-9]+$/.test(email)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_in_en']} ${email} `, 3000))
      return
    }
    if (!/^[0-9]+$/.test(phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${phone} `, 3000))
      return
    }

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
      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        {words_he['register']}
      </button>
    </form>
  )
}

export default Register
// style={{direction: 'ltr}}
