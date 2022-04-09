import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../redux/Auth/action'

const words_he = require('../utils/words_he').words_he

const Login = (props) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const type = useSelector((state) => state.auth.type)
  let currentRoute = useSelector((state) => state.auth.currentRoute)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.login(username, password))
  }

  if (isAuthenticated) {
    if (currentRoute.toUpperCase() === '/LOGIN' || currentRoute === '/') {
      currentRoute = 'Home'
    }

    return <Redirect to={currentRoute} />
  } else if (type === 'login') {
    return <Redirect to={'/TwoFaVerification'} />
  }

  return (
    <div className='form-signin'>
      <form onSubmit={submit}>
        <img src='logo2.png' alt='logo' />
        <h1 className='h3 mb-3 fw-normal'>{words_he['please_sign_in']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />
        <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />
        <Link to='ForgotPassword'>
          <u style={{ color: 'black' }}>{words_he['forgot_password']}</u>
        </Link>
        <button className='w-100 btn btn-lg btn-success mt-1' type='submit'>
          {words_he['login']}
        </button>
      </form>
    </div>
  )
}
export default Login
