import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../redux/Auth/action'
import { Redirect, Link } from 'react-router-dom'

const words_he = require('../utils/words_he').words_he

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  let currentRoute = useSelector((state) => state.auth.currentRoute)

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.login(username, password))
  }

  if (isAuthenticated) {
    if (currentRoute.toUpperCase() === '/LOGIN' || currentRoute === '/') {
      currentRoute = 'Home'
    }
    return <Redirect to={currentRoute} />
  }

  return (
    <div className='form-signin'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>{words_he['please_sign_in']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />

        <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />

        <button className='w-100 btn btn-lg btn-success' type='submit'>
          {words_he['login']}
        </button>
      </form>
      <Link to='ForgotPassword' className='nav-link'>
        <button className='w-30 btn btn-sm btn-primary m-3'>{words_he['forgot_password']}</button>{' '}
      </Link>
    </div>
  )
}
export default Login
