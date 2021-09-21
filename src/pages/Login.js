import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../redux/Auth/action'
import { Redirect } from 'react-router-dom'

const words_he = require('../utils/words_he').words_he

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.login(username, password))
  }

  //TODO - NOT WOTKING
  const forgot_password = () => {
    console.log("login -> forgot");
    window.location.replace('http://localhost:3000/ForgotPassword')

    return <Redirect to='ForgotPassword'/>
  }

  if (isAuthenticated) {
    return <Redirect to='Home' />
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>{words_he['please_sign_in']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />

        <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />

        <button className='w-100 btn btn-lg btn-success' type='submit'>
          {words_he['login']}
        </button>
      </form>
      <button className='w-30 btn btn-sm btn-primary m-3' onClick={forgot_password}>
        {words_he['forgot_password']}
      </button>
    </div>
  )
}

export default Login
