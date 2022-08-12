import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'
import { DebounceInput } from 'react-debounce-input'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateUser from '../components/pages/UpdateUser'

import { useDispatch, useSelector } from 'react-redux'
import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_user from '../redux/User/action'

import { InputLabel, Select, MenuItem } from '@mui/material/'
import SearchIcon from '@mui/icons-material/Search'

import Dictionary from '../utils/dictionary'

const Users = (props) => {
  const dispatch = useDispatch()

  const items = useSelector((state) => state.user.users)
  const meta_data = useSelector((state) => state.user.meta_data)
  const dictionary = Dictionary()

  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const [isShown, setIsShown] = useState(false)

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

    if (user['level'] === dictionary['admin']) {
      user['level'] = 1
    } else if (user['level'] === dictionary['user']) {
      user['level'] = 2
    } else if (user['level'] === dictionary['guest']) {
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
    item['is_active'] = item['is_active'] ? dictionary['active'] : dictionary['not_active']
    if (item['level'] === 1) {
      item['level'] = dictionary['admin']
    } else if (item['level'] === 2) {
      item['level'] = dictionary['user']
    } else if (item['level'] === 3) {
      item['level'] = dictionary['guest']
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
            {dictionary['create_new_user']}
          </button>
        </Link>
        <button className='transparent_button' onClick={create_csv} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
          {isShown && <div className='hoverStyles'> {dictionary['create_csv']} </div>}{' '}
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
            {dictionary['rows_to_display']}
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
      <DebounceInput className='debounce_search' minLength={2} debounceTimeout={1000} placeholder={dictionary['search']} onChange={(e) => setSearch(e.target.value)} />
      <SearchIcon />
      <TableBuilder
        items={items}
        cols={['username', 'email', 'first_name', 'last_name', 'phone', 'updated_at', 'is_active', 'level']}
        headers={{
          username: dictionary['username'],
          first_name: dictionary['first_name'],
          last_name: dictionary['last_name'],
          email: dictionary['email'],
          phone: dictionary['phone'],
          updated_at: dictionary['updated_at'],
          is_active: dictionary['status'],
          level: dictionary['permissions'],
        }}
        title={dictionary['users']}
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
