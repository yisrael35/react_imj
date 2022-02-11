import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateEvent from '../components/pages/UpdateEvent'
import * as action_event from '../redux/Event/action'
import * as action_popUp from '../redux/PopUp/action'

const words_he = require('../utils/words_he').words_he

const Events = (props) => {
  const items = useSelector((state) => state.event.events)
  const meta_data = useSelector((state) => state.event.meta_data)

  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
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
    const content = <UpdateEvent counter={index} id={event.id} limit={limit} offset={offset} />
    dispatch(action_popUp.setPopUp(content))
  }

  for (const item of items) {
    switch (item['type']) {
      case 'private':
        item['type'] = words_he['private']
        break
      case 'public':
        item['type'] = words_he['public']
        break
      case 'inside':
        item['type'] = words_he['inside']
        break
      case 'photo_shot':
        item['type'] = words_he['photo_shot']
        break
      default:
        break
    }
    switch (item['status']) {
      case 'pending':
        item['status'] = words_he['pending']
        break
      case 'approved':
        item['status'] = words_he['approved']
        break
      case 'canceled':
        item['status'] = words_he['canceled']
        break

      default:
        break
    }
  }

  return (
    <div>
      {/* search */}
      <span style={{ float: 'left', margin: '10px' }}>
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
        cols={['name', 'from_date', 'to_date', 'status', 'type']}
        headers={{
          name: words_he['name'],
          from_date: words_he['from_date'],
          to_date: words_he['to_date'],
          status: words_he['status'],
          type: words_he['type'],
        }}
        title={words_he['events']}
        offset={offset}
        handle_edit={handle_edit}
      />

      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Events

const limits = [
  { value: '5', label: 5 },
  { value: '10', label: 10 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
]

// budget: null​
// check_list: null​
// clients: null​
// comment: null​
// created_at: "2022-01-29T09:39:08.000Z"​
// from_date: "2022-01-29 10:00:00"​
// id: 12​
// name: "sadasd"​
// status: "pending"​
// suppliers: null​
// template_data_id: null​
// to_date: "2022-01-29 11:00:00"​
// type: "public"​
// updated_at: "2022-01-29T09:39:08.000Z"​
// user_id: 1​
// uuid: "4e5cd2bd-80e7-11ec-ae77-005056c00001"
