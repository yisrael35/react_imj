import React, { useEffect } from 'react'
import User from '../components/User'
import '../css/users.css'
import { useDispatch, useSelector } from 'react-redux'
import * as action_user from '../redux/User/action'

const words_he = require('../utils/words_he').words_he


const Users = (props) => {
  const users = useSelector((state) => state.user.users)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_user.get_users())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div >
      <div >
        <h5 className='card-title text-uppercase mb-0'> {words_he['users']}</h5>
        <table className='table user-table mb-0' >
          <thead>
            <tr>
              <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
                #
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['name']}
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['email']}
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['update_at']}
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['permissions']}
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['is_active']}
              </th>
              <th scope='col' className='border-0 text-uppercase font-medium'>
                {words_he['status']}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {this.props.items.length === 0 ? ' - There is no results' : ''} */}
            {users.map((user, index) => (
              <User user={user} counter={index}  key={user.id}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
