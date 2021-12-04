import React, { useState } from 'react'
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
  }
  const handle_level = (val) => {
    setLevel(Number(val))
  }
  const handle_save = () => {
    const data = { level, is_active }
    dispatch(action_user.update_user(data, props.user.id))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_user.get_users(limit, offset))
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
            {words_he['name']}
          </th>
          <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
            {words_he['permissions']}
          </th>
          <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
            {words_he['status']}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className='text-muted'>{props.user.first_name + ' ' + props.user.last_name}</span>
          </td>
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
          <td>
            <button type='button' className='btn btn-info' onClick={handle_save}>
              {words_he['save']}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default UpdateUser
