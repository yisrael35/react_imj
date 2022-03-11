import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'

import TableBuilder from '../components/general/TableBuilder'
import PaginationBottom from '../components/general/PaginationBottom'
import UpdateSupplier from '../components/pages/UpdateSupplier'
import CreateSupplier from '../components/pages/CreateSupplier'

import * as action_popUp from '../redux/PopUp/action'
import * as action_loading from '../redux/Loading/action'
import * as action_supplier from '../redux/Supplier/action'
import { FaFileCsv, FaRegEdit } from 'react-icons/fa'

const words_he = require('../utils/words_he').words_he

const Suppliers = () => {
  const items = useSelector((state) => state.supplier.suppliers)
  const meta_data = useSelector((state) => state.supplier.meta_data)
  const [limit, setLimit] = useState(process.env.REACT_APP_LIMIT)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState(undefined)
  const dispatch = useDispatch()
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

  for (let i = 0; i < items.length; i++) {
    let account_details_str = ''
    for (let key in items[i].account) {
      let key_to_display
      if (key === 'iban' || key === 'swift') {
        key_to_display = key.toUpperCase()
      } else {
        key_to_display = key
      }
      account_details_str += key_to_display + ': ' + items[i].account[key] + ' |  \n'
    }
    items[i] = { ...items[i], account_details: account_details_str }
  }
  const create_csv = () => {
    dispatch(action_supplier.get_suppliers({ limit, offset, search, csv: true }))
    dispatch(action_loading.setLoading())
  }
  return (
    <div>
      {/* search */}
      <span className='field_search'>
        <button type='button' className='btn btn-info' onClick={handle_create}>
          {words_he['add_supplier']}
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
        cols={['name', 'phone', 'email', 'account_details', 'created_at']}
        headers={{
          name: words_he['name'],
          phone: words_he['phone'],
          email: words_he['email'],
          account_details: words_he['account_details'],
          created_at: words_he['created_at'],
        }}
        title={words_he['suppliers']}
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
