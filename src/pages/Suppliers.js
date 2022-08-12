import React, { useEffect, useState } from 'react'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'
import { DebounceInput } from 'react-debounce-input'

import { useDispatch, useSelector } from 'react-redux'
import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_supplier from '../redux/Supplier/action'

import SearchIcon from '@mui/icons-material/Search'
import { InputLabel, Select, MenuItem } from '@mui/material/'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateSupplier from '../components/pages/UpdateSupplier'
import CreateSupplier from '../components/pages/CreateSupplier'

import Dictionary from '../utils/dictionary'

const Suppliers = () => {
  const dispatch = useDispatch()

  const items = useSelector((state) => state.supplier.suppliers)
  const meta_data = useSelector((state) => state.supplier.meta_data)
  const dictionary = Dictionary()

  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    dispatch(action_supplier.get_suppliers({ limit, offset, search }))
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
    let supplier
    for (const item of items) {
      if (item['id'] === id) {
        supplier = item
        break
      }
    }
    const content = <UpdateSupplier supplier={supplier} counter={index} key={supplier.id} limit={limit} offset={offset} />
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

  const handle_create = () => {
    const new_supplier = <CreateSupplier />
    dispatch(action_popUp.setPopUp(new_supplier))
  }
  const create_csv = () => {
    dispatch(action_supplier.get_suppliers({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }
  const unstruct_items = (items) => {
    return items.map((item) => {
      return { ...item, account_owner_name: item.account?.account_name, iban: item.account?.iban, swift: item.account?.swift }
    })
  }

  return (
    <div>
      <span className='field_search'>
        <button type='button' className='btn btn-info' onClick={handle_create}>
          {dictionary['add_supplier']}
        </button>
        <button className='transparent_button' onClick={create_csv} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          <FaFileCsv style={{ fontSize: '28px', margin: '4px' }} />
          {isShown && <div className={'hoverStyles'}> {dictionary['create_csv']} </div>}{' '}
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
        items={unstruct_items(items)}
        cols={['name', 'phone', 'email', 'account_owner_name', 'iban', 'swift', 'created_at']}
        headers={{
          name: dictionary['name'],
          phone: dictionary['phone'],
          email: dictionary['email'],
          account_owner_name: dictionary['account_name'],
          iban: 'IBAN',
          swift: 'SWIFT',
          created_at: dictionary['created_at'],
        }}
        title={dictionary['suppliers']}
        offset={offset}
        handle_click={handle_edit}
        click_icon={edit_icon}
      />
      <PaginationBottom limit={limit} offset={offset} meta_data={meta_data} next_page={next_page} previous_page={previous_page} />
    </div>
  )
}

export default Suppliers

const limits = [
  { value: '15', label: 15 },
  { value: '25', label: 25 },
  { value: '50', label: 50 },
  { value: '100', label: 100 },
]
