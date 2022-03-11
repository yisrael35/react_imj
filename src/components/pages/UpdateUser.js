import React, { useState } from 'react'
import '../../css/users.css'
import { useDispatch } from 'react-redux'
import * as action_user from '../../redux/User/action'
import * as action_popUp from '../../redux/PopUp/action'
import { FaUserEdit } from 'react-icons/fa'

const words_he = require('../../utils/words_he').words_he

const UpdateUser = (props) => {
  const [is_active, setIsActive] = useState(props.user.is_active === words_he['active'] ? 1 : 0)
  const [level, setLevel] = useState(props.user.level)
  const dispatch = useDispatch()
  const handle_status = (val) => {
    setIsActive(Number(val))
  }
  const handle_level = (val) => {
    setLevel(Number(val))
  }
  const handle_save = () => {
    const data = { level, is_active }
    dispatch(action_user.update_user_by_id(data, props.user.id))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_user.get_users({ limit, offset }))
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  return (
    <div>
      <h3 className='text-muted'>{words_he['update_user']}</h3>
      <FaUserEdit
        style={{
          fontSize: '80px',
          margin: '10px',
        }}
      />
      <table>
        <thead>
          <tr>
            <th className='text-muted'>{words_he['name']}</th>
            <th className='text-muted'>{words_he['permissions']}</th>
            <th className='text-muted'>{words_he['status']}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{props.user.first_name + ' ' + props.user.last_name}</span>
            </td>
            <td>
              <ul>
                <li>
                  <input type='radio' value='1' name={'level'} checked={level === 1} onChange={(e) => handle_level(1)} /> {words_he['admin']}
                </li>
                <li>
                  <input type='radio' value='2' name={'level'} checked={level === 2} onChange={(e) => handle_level(2)} /> {words_he['user']}
                </li>
                <li>
                  <input type='radio' value='3' name={'level'} checked={level === 3} onChange={(e) => handle_level(3)} /> {words_he['guest']}
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
            <td></td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='btn btn-success mt-2' onClick={handle_save}>
        {words_he['save']}
      </button>
    </div>
  )
}

export default UpdateUser
