import React, { useState, useEffect } from 'react'
import '../../css/users.css'
import { useDispatch } from 'react-redux'
import * as action_user from '../../redux/User/action'
import * as action_popUp from '../../redux/PopUp/action'
import * as actionSnackBar from '../../redux/SnackBar/action'
import { FaUserEdit } from 'react-icons/fa'

import Dictionary from '../../utils/dictionary'
const { validateEmail, invalid_email_characters } = require('../../utils/validate_helper')

const UpdateUser = (props) => {
  const dictionary = Dictionary()
  const [is_active, setIsActive] = useState(props.user.is_active === dictionary['active'] ? 1 : 0)
  const [level, setLevel] = useState(props.user.level)
  const [email, setEmail] = useState(props.user.email)
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (invalid_email_characters(email)) {
      dispatch(actionSnackBar.setSnackBar('error', `${dictionary['invalid_character']} ${email} `, 3000))
      return false
    }
    if (validateEmail(email)) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  const dispatch = useDispatch()
  const handle_status = (val) => {
    setIsActive(Number(val))
  }
  const handle_level = (val) => {
    setLevel(Number(val))
  }
  const handle_save = () => {
    const data = { email, level, is_active }
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
      <h3 className='text-muted'>{dictionary['update_user']}</h3>
      <FaUserEdit
        style={{
          fontSize: '80px',
          margin: '10px',
        }}
      />
      <table>
        <thead>
          <tr>
            <th className='text-muted'>{dictionary['name']}</th>
            <th className='text-muted'>{dictionary['email']}</th>
            <th className='text-muted'>{dictionary['permissions']}</th>
            <th className='text-muted'>{dictionary['status']}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{props.user.first_name + ' ' + props.user.last_name}</span>
            </td>
            <td>
              <input
                style={{ textAlign: 'center', marginRight: '4px', marginLeft: '4px' }}
                type='text'
                className='form-control'
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </td>
            <td>
              <ul>
                <li>
                  <input type='radio' value='1' name={'level'} checked={level === 1} onChange={(e) => handle_level(1)} /> {dictionary['admin']}
                </li>
                <li>
                  <input type='radio' value='2' name={'level'} checked={level === 2} onChange={(e) => handle_level(2)} /> {dictionary['user']}
                </li>
                <li>
                  <input type='radio' value='3' name={'level'} checked={level === 3} onChange={(e) => handle_level(3)} /> {dictionary['guest']}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  <input type='radio' value='1' name={'status'} checked={is_active === 1} onChange={(e) => handle_status(e.target.value)} /> {dictionary['active']}
                </li>
                <li>
                  <input type='radio' value='0' name={'status'} checked={is_active === 0} onChange={(e) => handle_status(e.target.value)} /> {dictionary['not_active']}
                </li>
              </ul>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='btn btn-success mt-2' onClick={handle_save} disabled={!enable_send}>
        {dictionary['save']}
      </button>
    </div>
  )
}

export default UpdateUser
