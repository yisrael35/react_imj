import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import * as authActions from '../redux/Auth/action'

import Dictionary from '../utils/dictionary'

const ForgotPassword = (props) => {
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const dictionary = Dictionary()
  let { token } = useParams()
  const dispatch = useDispatch()

  const submit = async (e) => {
    try {
      e.preventDefault()
      dispatch(authActions.reset_password(password, token))
      setRedirect(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (password === confirm_password) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
    // eslint-disable-next-line
  }, [password, confirm_password])

  if (redirect) {
    setTimeout(() => {
      return <Redirect to='Home' />
    }, 3000)
  }
  return (
    <div className='form-signin'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>{dictionary['reset_password']}</h1>

        <input type='password' className='form-control' placeholder={dictionary['new_password']} required onChange={(e) => setPassword(e.target.value)} />
        <input type='password' className='form-control' placeholder={dictionary['confirm_password']} required onChange={(e) => setConfirmPassword(e.target.value)} />
        {!passwordMatch && <span style={{ color: 'red' }}> {dictionary['password_not_matched']}</span>}
        <button className='w-100 btn btn-lg btn-success' type='submit' disabled={!passwordMatch}>
          {dictionary['send']}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
