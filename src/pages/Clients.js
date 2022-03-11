import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateClient from '../components/pages/UpdateClient'
import CreateClient from '../components/pages/CreateClient'

import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_client from '../redux/Client/action'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'

const words_he = require('../utils/words_he').words_he

const Clients = () => {
  const items = useSelector((state) => state.client.clients)
  const meta_data = useSelector((state) => state.client.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_client.get_clients({ limit, offset, search }))
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
    let client
    for (const item of items) {
      if (item['id'] === id) {
        client = item
        break
      }
    }
    const content = <UpdateClient client={client} counter={index} key={client.id} limit={limit} offset={offset} />
    dispatch(action_popUp.setPopUp(content))
  }

  const handle_create = () => {
    const new_client = <CreateClient />
    dispatch(action_popUp.setPopUp(new_client))
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
    switch (item['type']) {
      case 'private':
        item['type'] = words_he['private']
        break
      case 'company':
        item['type'] = words_he['company']
        break
      case 'department':
        item['type'] = words_he['department']
        break
      default:
        break
    }
  }
  const create_csv = () => {
    dispatch(action_client.get_clients({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }
  return (
    <div>
      {/* search */}
      <span className='field_search'>
        <button type='button' className='btn btn-info' onClick={handle_create}>
          {words_he['add_client']}
        </button>
        <button className='transparent_button' onClick={create_csv}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
        </button>
        <DebounceInput minLength={2} debounceTimeout={1000} placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} />
      </span>
      {/* Pagination Top */}
      <Select
        className={'pagination-select'}
        placeholder={`${limit}`}
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
        cols={['name', 'type', 'phone', 'email', 'created_at']}
        headers={{
          name: words_he['name'],
          type: words_he['type'],
          phone: words_he['phone'],
          email: words_he['email'],
          created_at: words_he['created_at'],
        }}
        title={words_he['clients']}
        offset={offset}
        handle_click={handle_edit}
        click_icon={edit_icon}
      />
      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Clients

const limits = [
  { value: '15', label: 15 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
  { value: '100', label: 100 },
]
