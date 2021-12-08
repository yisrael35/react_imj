import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/TableBuilder'
import PaginationBottom from '../components/PaginationBottom'
// import UpdateUser from '../components/UpdateUser'

// import * as action_popUp from '../redux/PopUp/action'
import * as action_bid from '../redux/Bid/action'

const words_he = require('../utils/words_he').words_he

const Bids = (props) => {
  const items = useSelector((state) => state.bid.bids)
  const meta_data = useSelector((state) => state.bid.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action_bid.get_bids(limit, offset, search))
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
   
    // const content = <UpdateBid bid={bid} counter={index} key={bid.id} limit={limit} offset={offset} />
    // dispatch(action_popUp.setPopUp(content))
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
        cols={['event_type', 'location', 'first_name', 'event_date', 'event_name', 'client_name']}
        headers={{
          event_type: words_he['event_type'],
          location: words_he['location'],
          first_name: words_he['first_name'],
          event_date: words_he['event_date'],
          event_name: words_he['event_name'],
          client_name: words_he['client_name'],
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
