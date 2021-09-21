import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
const words_he = require('../utils/words_he').words_he

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    await fetch(process.env.REACT_APP_REST_IMJ_URL + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to='/login' />
  }

  return (
    <form onSubmit={submit}>
      <h1 className='h3 mb-3 fw-normal'> {words_he['register']}</h1>

      <input className='form-control' placeholder={words_he['name']} required onChange={(e) => setName(e.target.value)} />

      <input type='email' className='form-control' placeholder={words_he['email']} required onChange={(e) => setEmail(e.target.value)} />

      <input type='password' className='form-control' placeholder={words_he['password']} required onChange={(e) => setPassword(e.target.value)} />

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        {words_he['register']}
      </button>
    </form>
  )
}

export default Register
