import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../redux/User/action'
const words_he = require('../utils/words_he').words_he


const ProfileSettings = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  
  useEffect(() => {
    dispatch(userActions.get_user())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {user.id}
    </div>
  )
}

export default ProfileSettings
