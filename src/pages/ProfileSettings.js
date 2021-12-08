import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../redux/User/action'
const words_he = require('../utils/words_he').words_he

const ProfileSettings = (props) => {
  const dispatch = useDispatch()
  const userContent = useSelector((state) => state.auth.userContent)
  const user = useSelector((state) => state.user.user)
  console.log(user)
  useEffect(() => {
    const { id: user_id } = userContent
    dispatch(userActions.get_user(user_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default ProfileSettings
