import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as authActions from '../redux/Auth/action'
import axios from 'axios'
const words_he = require('../utils/words_he').words_he

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('')
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.forgotPassword(username))
    // try {
      // await axios.post(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', { username })
      setRedirect(true)
    // } catch (error) {}
  }

  if (redirect) {
    //TODO -display on screen message

    setTimeout(() => {
      console.log('This will run after 3 second! => it will go to home page')
      return <Redirect to='Home' />
    }, 3000)
  }
  return (
    <div>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>{words_he['forgot_password']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />

        {/* <input type='password' className='form-control' placeholder={words_he['username']} required onChange={(e) => setPassword(e.target.value)} /> */}

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          {words_he['send']}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
