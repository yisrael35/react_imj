import React, { useState } from 'react'
import moment from 'moment'
import '../css/users.css'
import { useDispatch } from 'react-redux'
import * as action_user from '../redux/User/action'

const words_he = require('../utils/words_he').words_he

const UpdateUser = (props) => {
  const [is_active, setIsActive] = useState(props.user.is_active === words_he['active'] ? 1 : 0)
  const [level, setLevel] = useState(props.user.level === words_he['admin'] ? 1 : 2)
  const dispatch = useDispatch()
  const handle_status = (val) => {
    setIsActive(Number(val))
    dispatch(action_user.delete_user(props.user.id))
  }
  const handle_level = (val) => {
    setLevel(Number(val))
    const data = { level: Number(val) }
    dispatch(action_user.update_user(data, props.user.id))
  }
  //calculate the time to local time from utc
  const updated_at = moment.utc(props.user.updated_at).local().format(`yyyy-MM-DD HH:mm:ss`)

  return (
    <tr>
      <td>
        <span className='text-muted'>{props.user.first_name + ' ' + props.user.last_name}</span>
      </td>
      {/* <td>
        <span className='text-muted'>{props.user.email}</span>
      </td> */}
      {/* <td>
        <span className='text-muted'>{updated_at}</span>
      </td> */}
      <td>
        <ul>
          <li>
            <input type='radio' value='1' name={'level'} checked={level === 1} onChange={(e) => handle_level(e.target.value)} /> {words_he['admin']}
          </li>
          <li>
            <input type='radio' value='2 ' name={'level'} checked={level === 2} onChange={(e) => handle_level(e.target.value)} /> {words_he['user']}
          </li>
        </ul>
      </td>
      <td>
        <ul>
          <li>
            <input type='radio' value='1' name={'status'} checked={is_active === 1} onChange={(e) => handle_status(e.target.value)} /> {words_he['active']}
          </li>
          <li>
            <input type='radio' value='0' name={'status'} checked={is_active === 0} onChange={(e) => handle_status(e.target.value)} /> {words_he['not_active']}
          </li>
        </ul>
      </td>
    </tr>
  )
}

export default UpdateUser
