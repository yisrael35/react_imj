import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateBid from '../components/pages/UpdateBid'

import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_bid from '../redux/Bid/action'
import { FaFileCsv } from 'react-icons/fa'

const words_he = require('../utils/words_he').words_he

const Bids = (props) => {
  const items = useSelector((state) => state.bid.bids)
  const meta_data = useSelector((state) => state.bid.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_bid.get_bids({ limit, offset, search }))
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
    // let bid
    // for (const item of items) {
    //   if (item['id'] === id) {
    //     bid = item
    //     break
    //   }
    // }
    const content = <UpdateBid counter={index} id={id} limit={limit} offset={offset} />
    dispatch(action_popUp.setPopUp(content))
  }
  const create_csv = () => {
    dispatch(action_bid.get_bids({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }
  // const search = <FaSearch style={{ fontSize: '28px', margin: '4px' }} />
  return (
    <div>
      {/* search */}
      <span className='field_search'>
        <Link to='/CreateBid'>
          <button type='button' className='btn btn-info'>
            {words_he['new_bid']}
          </button>
        </Link>
        <button className='transparent_button' onClick={create_csv}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
        </button>
        <DebounceInput minLength={2} debounceTimeout={1000} placeholder={words_he['search']} onChange={(e) => setSearch(e.target.value)} />
        {/* <FaSearch style={{ fontSize: '28px', margin: '4px' }} /> */}
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
        cols={['event_name', 'client', 'event_date', 'event_type', 'location', 'first_name']}
        headers={{
          event_name: words_he['event_name'],
          event_type: words_he['event_type'],
          location: words_he['location'],
          first_name: words_he['employee_name'],
          event_date: words_he['event_date'],
          client: words_he['client_name'],
        }}
        title={words_he['bids']}
        offset={offset}
        handle_edit={handle_edit}
      />

      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Bids

const limits = [
  { value: '5', label: 5 },
  { value: '10', label: 10 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
]
