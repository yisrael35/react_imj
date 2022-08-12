import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as authActions from '../redux/Auth/action'

import Dictionary from '../utils/dictionary'

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const dictionary = Dictionary()
  const submit = async (e) => {
    e.preventDefault()
    dispatch(authActions.forgotPassword(username))
    props.history.push('/Home')
  }

  return (
    <div className='form-signin'>
      <form onSubmit={submit}>
        <img src='logo2.png' alt='logo' />
        <h1 className='h3 mb-3 fw-normal'>{dictionary['forgot_password']}</h1>
        <input type='text' className='form-control' placeholder={dictionary['username']} required onChange={(e) => setUsername(e.target.value)} />
        <button className='w-100 btn btn-lg btn-success mt-3' type='submit'>
          {dictionary['send']}
        </button>
      </form>
    </div>
  )
}

// export default ForgotPassword
export default withRouter(ForgotPassword)
