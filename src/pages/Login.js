import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as authActions from '../redux/Auth/action'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const words_he = require('../helper/words_he').words_he

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.login(username, password))
    // console.log(process.env.REACT_APP_REST_IMJ_URL)
    // console.log({
    //   username: username,
    //   password,
    // })
    // const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/auth', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   // credentials: 'include',
    //   body: JSON.stringify({
    //     username: username,
    //     password,
    //   }),
    // })

    // const content = await response.json()

    // console.log(content.user.name)
    // setRedirect(true)
    // props.setName(content.user.name)
    // //need to save the token
  }

  // if (redirect) {
  //   return <Redirect to='/' />
  // }

  if (isAuthenticated) {
    return <Redirect to='Home' />
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>{words_he['please_sign_in']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />

        <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          {words_he['login']}
        </button>
      </form>
      {/* <button onClick={<Redirect to='/forgot_password' />}>{words_he['forgot_password']}</button> */}
    </div>
  )
}

export default Login
