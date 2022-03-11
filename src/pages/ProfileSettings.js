import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../redux/User/action'
import * as actionSnackBar from '../redux/SnackBar/action'

const words_he = require('../utils/words_he').words_he
const { invalid_phone, all_fields_filled } = require('../utils/validate_helper')

const ProfileSettings = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [user_info, setUserInfo] = useState({ first_name: '', last_name: '', phone: '', password: '', confirm_password: '' })
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_info])

  const validate_fields = () => {
    if (user_info.phone && invalid_phone(user_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${user_info.phone} `, 3000))
      return false
    }

    return true
  }

  const submit = async (e) => {
    e.preventDefault()
    for (const [key, val] of Object.entries(user_info)) {
      if (val === '') {
        delete user_info[key]
      }
    }
    if (!passwordMatch) {
      delete user_info.password
      delete user_info.confirm_password
    }

    dispatch(userActions.update_user(user_info))
  }
  useEffect(() => {
    dispatch(userActions.get_user())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user_info.password === user_info.confirm_password) {
      setPasswordMatch(true)
    } else {
      setEnableSend(false)
      setPasswordMatch(false)
    }
    // eslint-disable-next-line
  }, [user_info.confirm_password])
  useEffect(() => {
    if (Object.keys(user).length) {
      setUserInfo({ ...user })
    }
  }, [user])
  return (
    <div style={{ lineHeight: '2', verticalAlign: 'middle', textAlign: 'center' }}>
      <h4>{words_he['profile_settings']}</h4>
      <form onSubmit={submit} className='form-signin'>
        <label>
          {words_he['first_name']}
          <input className='form-control' value={user_info.first_name} onChange={(e) => setUserInfo({ ...user_info, first_name: e.target.value })} />
        </label>
        <label>
          {words_he['last_name']}
          <input className='form-control' value={user_info.last_name} onChange={(e) => setUserInfo({ ...user_info, last_name: e.target.value })} />
        </label>
        <label>
          {words_he['phone']}
          <input type='text' className='form-control' value={user_info.phone} onChange={(e) => setUserInfo({ ...user_info, phone: e.target.value })} />
        </label>
        <label>
          {words_he['new_password']}
          <input type='password' className='form-control' value={user_info.password} onChange={(e) => setUserInfo({ ...user_info, password: e.target.value })} />
        </label>
        <label>
          {words_he['confirm_password']}
          <input type='password' className='form-control' value={user_info.confirm_password} onChange={(e) => setUserInfo({ ...user_info, confirm_password: e.target.value })} />
          {!passwordMatch && <span style={{ color: 'red' }}> {words_he['password_not_matched']}</span>}
        </label>
        <div>
          <button className='w-45 btn m-2 btn-success' type='submit' disabled={!enable_send}>
            {words_he['send']}
          </button>
        </div>
      </form>
    </div>
  )
  // return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default ProfileSettings

// created_at: "2021-09-11T15:08:27.000Z"
// ​
// email: "yisrael35@gmail.com"
// ​
// first_name: "yisrael - azriel"
// ​
// id: "1e236f85-1312-11ec-97b5-005056c00001"
// ​
// is_active: 1
// ​
// last_login: "2022-01-10T05:22:16.000Z"
// ​
// last_name: "b"
// ​
// level: 1
// ​
// phone: null
// ​
// updated_at: "2022-01-10T05:22:16.000Z"
// ​
// username: "y@gmail.com"
