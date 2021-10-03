import React, { useState } from 'react'
import moment from 'moment'
import '../css/users.css'
import { useDispatch } from 'react-redux'
import * as action_user from '../redux/User/action'

const words_he = require('../utils/words_he').words_he

const User = (props) => {
  const [status, setStatus] = useState(props.user.is_active)

  const handle_on_change_status = () => {
    dispatch(action_user.delete_user(props.user.id))
    setStatus(status ? 0 : 1)
  }

  const dispatch = useDispatch()
  return (
    <tr>
      <td className='pl-4'>{props.counter}</td>
      <td>
        <span className='text-muted'>{props.user.name}</span>
      </td>
      <td>
        <span className='text-muted'>{props.user.email}</span>
      </td>
      <td>
        <span className='text-muted'>
          {moment(props.user.updated_at, ['YYYY-MM-DDTHH:mm:ss']).format(`yyyy-MM-DD HH:mm:ss`)}
          {/* {props.user.updated_at} */}
        </span>
      </td>
      <td>
        <span className='text-muted'>{props.user.level === 1 ? words_he['admin'] : words_he['user']}</span>
      </td>
      <td>
        <span className='text-muted'>{status === 1 ? words_he['active'] : words_he['not_active']}</span>
      </td>
      <td>
        <ul>
          <li>
            <input type='radio' value='Male' name={props.user.id} checked={status === 1} onChange={handle_on_change_status} /> {words_he['active']}
          </li>
          <li>
            <input type='radio' value='Female' name={props.user.id} checked={status === 0} onChange={handle_on_change_status} /> {words_he['not_active']}
          </li>
        </ul>
      </td>
    </tr>
  )
}

export default User
