import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

import { useDispatch, useSelector } from 'react-redux'
import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_bid from '../redux/Bid/action'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateBid from '../components/pages/UpdateBid'

import { FaFileCsv, FaRegFilePdf } from 'react-icons/fa'
import SearchIcon from '@mui/icons-material/Search'
import { InputLabel, Select, MenuItem } from '@mui/material/'

import Dictionary from '../utils/dictionary'

const Bids = (props) => {
  const dispatch = useDispatch()
  const dictionary = Dictionary()
  const items = useSelector((state) => state.bid.bids)
  const meta_data = useSelector((state) => state.bid.meta_data)

  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const [isShown, setIsShown] = useState(false)

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
  const pdf_icon = (
    <FaRegFilePdf
      style={{
        fontSize: '20px',
        margin: '2px',
      }}
    />
  )
  const handle_download_pdf = (id, index) => {
    const content = <UpdateBid counter={index} id={id} limit={limit} offset={offset} />
    dispatch(action_popUp.setPopUp(content))
  }
  const create_csv = () => {
    dispatch(action_bid.get_bids({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }

  return (
    <div>
      <span className='field_search'>
        <Link to='/CreateBid'>
          <button type='button' className='btn btn-info'>
            {dictionary['new_bid']}
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
        cols={['event_name', 'client', 'event_date', 'event_type', 'location', 'first_name', 'language', 'status']}
        headers={{
          event_name: dictionary['event_name'],
          event_type: dictionary['event_type'],
          location: dictionary['location'],
          first_name: dictionary['employee_name'],
          event_date: dictionary['event_date'],
          client: dictionary['client_name'],
          language: dictionary['language'],
          status: dictionary['status'],
        }}
        title={dictionary['bids']}
        offset={offset}
        handle_click={handle_download_pdf}
        click_icon={pdf_icon}
      />
      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Bids

const limits = [
  { value: '15', label: 15 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
  { value: '100', label: 100 },
]
