import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
const words_he = require('../helper/words_he').words_he

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    console.log({
      username: username,
    })
    const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/forgot_password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
      }),
    })

    const content = await response.json()
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to='/' />
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
      <button onClick={<Redirect to='/forgot_password' />}>{words_he['forgot_password']}</button>
    </div>
  )
}

export default ForgotPassword
