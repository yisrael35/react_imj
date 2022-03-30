import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import { InputLabel, Select, MenuItem } from '@mui/material/'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateUser from '../components/pages/UpdateUser'

import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_user from '../redux/User/action'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'
import SearchIcon from '@mui/icons-material/Search'

const words_he = require('../utils/words_he').words_he

const Users = (props) => {
  const items = useSelector((state) => state.user.users)
  const meta_data = useSelector((state) => state.user.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const [isShown, setIsShown] = useState(false)

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

  const edit_icon = (
    <FaRegEdit
      style={{
        fontSize: '18px',
        margin: '2px',
      }}
    />
  )

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
    dispatch(action_loading.setLoading())
  }

  return (
    <div>
      <span className='field_search'>
        <Link to='/Register'>
          <button type='button' className='btn btn-info'>
            {words_he['create_new_user']}
          </button>
        </Link>
        <button className='transparent_button' onClick={create_csv} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
          {isShown && <div className='hoverStyles'> {words_he['create_csv']} </div>}{' '}
        </button>
        <span>
          {/* Pagination Top */}
          <InputLabel
            style={{
              position: 'absolute',
              top: '75px',
              left: '15px',
              display: 'inline',
            }}
          >
            {words_he['rows_to_display']}
          </InputLabel>
          <Select
            variant='standard'
            className={'pagination-select'}
            value={`${limit}`}
            id='standard-required'
            label='limits'
            onChange={(e) => {
              setOffset(0)
              setLimit(e.target.value)
            }}
          >
            {limits.map((element) => (
              <MenuItem value={element.value} key={element.value}>
                {element.label}
              </MenuItem>
            ))}
          </Select>
        </span>
      </span>
      {/* search */}
      <DebounceInput className='debounce_search' minLength={2} debounceTimeout={1000} placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} />
      <SearchIcon />

      <TableBuilder
        items={items}
        cols={['username', 'email', 'first_name', 'last_name', 'phone', 'updated_at', 'is_active', 'level']}
        headers={{
          username: words_he['username'],
          first_name: words_he['first_name'],
          last_name: words_he['last_name'],
          email: words_he['email'],
          phone: words_he['phone'],
          updated_at: words_he['updated_at'],
          is_active: words_he['status'],
          level: words_he['permissions'],
        }}
        title={words_he['users']}
        offset={offset}
        handle_click={handle_edit}
        click_icon={edit_icon}
      />

      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Users

const limits = [
  { value: '15', label: 15 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
  { value: '100', label: 100 },
]
