import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as authActions from '../redux/Auth/action'
const words_he = require('../utils/words_he').words_he

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.forgotPassword(username))
    props.history.push('/Home')
  }

  return (
    <div className='form-signin'>
      <form onSubmit={submit}>
        <img src='logo2.png' alt='logo' />
        <h1 className='h3 mb-3 fw-normal'>{words_he['forgot_password']}</h1>
        <input type='text' className='form-control' placeholder={words_he['username']} required onChange={(e) => setUsername(e.target.value)} />
        <button className='w-100 btn btn-lg btn-success mt-3' type='submit'>
          {words_he['send']}
        </button>
      </form>
    </div>
  )
}

// export default ForgotPassword
export default withRouter(ForgotPassword)
