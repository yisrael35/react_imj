import React, { useEffect, useState } from 'react'
import User from '../components/User'
import '../css/users.css'
import { useDispatch, useSelector } from 'react-redux'
import * as action_user from '../redux/User/action'
import Select from 'react-select'
import { DebounceInput } from 'react-debounce-input'

const words_he = require('../utils/words_he').words_he

const Users = (props) => {
  const users = useSelector((state) => state.user.users)
  const user_limit = useSelector((state) => state.user.limit)
  const user_offset = useSelector((state) => state.user.offset)
  const meta_data = useSelector((state) => state.user.meta_data)
  const [limit, setLimit] = useState(user_limit)
  const [offset, setOffset] = useState(user_offset)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_user.get_users(limit, offset, search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, search])

  const previous_page = () => {
    let new_offset = offset - limit
    new_offset = new_offset > 0 ? new_offset : 0
    setOffset(new_offset)
  }

  const next_page = () => {
    let new_offset = offset + limit
    setOffset(new_offset)
  }
  return (
    <div>
      <div className='user_page'>
        <h5 className='card-title text-uppercase mb-0'> {words_he['users']}</h5>
        <div>
          <DebounceInput minLength={2} debounceTimeout={1000} placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} />

          {/* <input type='search' placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} /> */}
          <Select
            className={'select'}
            placeholder={words_he['rows_to_display'] + `: ${limit}`}
            options={limits}
            id='limits'
            label='limits'
            onChange={(e) => {
              setLimit(e.value)
            }}
          />
          <span>{words_he['sum_rows'] + meta_data.sum_rows}</span>
        </div>
        <table className='table user-table mb-0'>
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
              <User user={user} counter={index + 1} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={previous_page} disabled={offset === 0}>
          {'<'}
        </button>
        <button onClick={next_page} disabled={meta_data.sum_rows <= offset}>
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Users

const limits = [
  { value: '5', label: 5 },
  { value: '10', label: 10 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
]
