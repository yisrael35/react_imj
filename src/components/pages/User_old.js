import React, { useState } from 'react'
import moment from 'moment'
import '../css/users.css'
import { useDispatch } from 'react-redux'
import * as action_user from '../redux/User/action'

const words_he = require('../utils/words_he').words_he

const User = (props) => {
  const [status, setStatus] = useState(props.user.is_active)
  const [permission, setPermission] = useState(props.user.level)
  const handle_on_change_status = () => {
    dispatch(action_user.delete_user(props.user.id))
    setStatus(status ? 0 : 1)
  }
  const handle_on_change_permission = () => {
    const data = { level: permission === 1 ? 2 : 1 }
    dispatch(action_user.update_user(data, props.user.id))
    setPermission(permission === 1 ? 2 : 1)
  }
  //calculate the time to local time from utc
  const updated_at = moment.utc(props.user.updated_at).local().format(`YYYY-MM-DD HH:mm:ss`)

  const dispatch = useDispatch()
  return (
    <tr>
      <td className='pl-4'>{props.counter}</td>
      <td>
        <span className='text-muted'>{props.user.first_name + ' ' + props.user.last_name}</span>
      </td>
      <td>
        <span className='text-muted'>{props.user.email}</span>
      </td>
      <td>
        <span className='text-muted'>{updated_at}</span>
      </td>
      <td>
        <ul>
          <li>
            <input type='radio' value='admin' name={'permission' + props.user.id} checked={permission === 1} onChange={handle_on_change_permission} /> {words_he['admin']}
          </li>
          <li>
            <input type='radio' value='user ' name={'permission' + props.user.id} checked={permission === 2} onChange={handle_on_change_permission} /> {words_he['user']}
          </li>
        </ul>
      </td>
      <td>
        <span className='text-muted'>{status === 1 ? words_he['active'] : words_he['not_active']}</span>
      </td>
      <td>
        <ul>
          <li>
            <input type='radio' value='active' name={'status' + props.user.id} checked={status === 1} onChange={handle_on_change_status} /> {words_he['active']}
          </li>
          <li>
            <input type='radio' value='not_active' name={'status' + props.user.id} checked={status === 0} onChange={handle_on_change_status} /> {words_he['not_active']}
          </li>
        </ul>
      </td>
    </tr>
  )
}

export default User
