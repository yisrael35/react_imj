import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
const words_he = require('../helper/words_he').words_he

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_REST_IMJ_URL)
    console.log({
      username: email,
      password,
    })
    const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: JSON.stringify({
        username: email,
        password,
      }),
    })

    const content = await response.json()
    console.log(content.user.name)
    setRedirect(true)
    props.setName(content.user.name)
    //need to save the token
  }

  if (redirect) {
    return <Redirect to='/' />
  }
  return (
    <form onSubmit={submit}>
      <h1 className='h3 mb-3 fw-normal'>{words_he['please_sign_in']}</h1>
      <input type='email' className='form-control' placeholder={words_he['email']} required onChange={(e) => setEmail(e.target.value)} />

      <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        {words_he['login']}
      </button>
    </form>
  )
}

export default Login
