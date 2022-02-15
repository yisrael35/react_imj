import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateUser from '../components/pages/UpdateUser'

import * as action_popUp from '../redux/PopUp/action'
import * as action_user from '../redux/User/action'
import { FaFileCsv } from 'react-icons/fa'

const words_he = require('../utils/words_he').words_he

const Users = (props) => {
  const items = useSelector((state) => state.user.users)
  const meta_data = useSelector((state) => state.user.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_user.get_users({ limit, offset, search }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, search])

  const previous_page = () => {
    let new_offset = Number(offset) - Number(limit)
    new_offset = new_offset > 0 ? new_offset : 0
    setOffset(new_offset)
  }

  const next_page = () => {
    let new_offset = Number(offset) + Number(limit)
    setOffset(new_offset)
  }
  const handle_edit = (id, index) => {
    let user
    for (const item of items) {
      if (item['id'] === id) {
        user = item
        break
      }
    }

    if (user['level'] === words_he['admin']) {
      user['level'] = 1
    } else if (user['level'] === words_he['user']) {
      user['level'] = 2
    } else if (user['level'] === words_he['guest']) {
      user['level'] = 3
    }
    const content = <UpdateUser user={user} counter={index} key={user.id} limit={limit} offset={offset} />
    dispatch(action_popUp.setPopUp(content))
  }

  for (const item of items) {
    item['is_active'] = item['is_active'] ? words_he['active'] : words_he['not_active']
    if (item['level'] === 1) {
      item['level'] = words_he['admin']
    } else if (item['level'] === 2) {
      item['level'] = words_he['user']
    } else if (item['level'] === 3) {
      item['level'] = words_he['guest']
    }
  }
  const create_csv = () => {
    dispatch(action_user.get_users({ limit, offset, search, csv: true }))
    //TODO -- make loading
  }
  return (
    <div>
      {/* search */}
      <span className='field_search'>
        <button className='transparent_button' onClick={create_csv}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
        </button>
        <DebounceInput minLength={2} debounceTimeout={1000} placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} />
      </span>
      {/* Pagination Top */}
      <Select
        className={'select'}
        placeholder={words_he['rows_to_display'] + `: ${limit}`}
        options={limits}
        id='limits'
        label='limits'
        onChange={(e) => {
          setOffset(0)
          setLimit(e.value)
        }}
      />
      <TableBuilder
        items={items}
        cols={['username', 'email', 'first_name', 'last_name', 'is_active', 'level']}
        headers={{
          username: words_he['username'],
          first_name: words_he['first_name'],
          last_name: words_he['last_name'],
          email: words_he['email'],
          is_active: words_he['status'],
          level: words_he['permissions'],
        }}
        title={words_he['users']}
        offset={offset}
        handle_edit={handle_edit}
      />

      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
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
