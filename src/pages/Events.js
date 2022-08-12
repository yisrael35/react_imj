import React, { useEffect, useState } from 'react'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'
import { DebounceInput } from 'react-debounce-input'

import { useDispatch, useSelector } from 'react-redux'
import * as action_event from '../redux/Event/action'
import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateEvent from '../components/pages/UpdateEvent'
import CreateEvent from '../components/pages/CreateEvent'

import { InputLabel, Select, MenuItem } from '@mui/material/'
import SearchIcon from '@mui/icons-material/Search'

import Dictionary from '../utils/dictionary'

const Events = (props) => {
  const dispatch = useDispatch()
  const dictionary = Dictionary()
  const items = useSelector((state) => state.event.events)
  const meta_data = useSelector((state) => state.event.meta_data)

  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    dispatch(action_event.get_events({ limit, offset, search }))
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
    let event
    for (const item of items) {
      if (item['id'] === id) {
        event = item
        break
      }
    }
    const content = <UpdateEvent counter={index} id={event.id} data={event} limit={limit} offset={offset} />
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
    switch (item['type']) {
      case 'private':
        item['type'] = dictionary['private']
        break
      case 'public':
        item['type'] = dictionary['public']
        break
      case 'inside':
        item['type'] = dictionary['inside']
        break
      case 'photo_shot':
        item['type'] = dictionary['photo_shot']
        break
      default:
        break
    }
    switch (item['status']) {
      case 'pending':
        item['status'] = dictionary['pending']
        break
      case 'approved':
        item['status'] = dictionary['approved']
        break
      case 'canceled':
        item['status'] = dictionary['canceled']
        break

      default:
        break
    }
  }
  const create_csv = () => {
    dispatch(action_event.get_events({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }

  return (
    <div>
      <span className='field_search'>
        <button
          type='button'
          className='btn btn-info'
          onClick={() => {
            const content = <CreateEvent />
            dispatch(action_popUp.setPopUp(content))
          }}
        >
          {dictionary['create_event']}
        </button>
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
        cols={['name', 'from_date', 'to_date', 'first_name', 'status', 'type']}
        headers={{
          name: dictionary['name'],
          from_date: dictionary['from_date'],
          to_date: dictionary['to_date'],
          first_name: dictionary['employee_name'],
          status: dictionary['status'],
          type: dictionary['type'],
        }}
        title={dictionary['events']}
        offset={offset}
        handle_click={handle_edit}
        click_icon={edit_icon}
      />
      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Events

const limits = [
  { value: '15', label: 15 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
  { value: '100', label: 100 },
]
