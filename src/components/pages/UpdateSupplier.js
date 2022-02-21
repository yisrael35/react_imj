import React, { useState } from 'react'
import '../../css/suppliers.css'
import { useDispatch } from 'react-redux'
import * as action_supplier from '../../redux/Supplier/action'
import * as action_popUp from '../../redux/PopUp/action'

const words_he = require('../../utils/words_he').words_he

const UpdateSupplier = (props) => {
  console.log(props.supplier)
  const { name, email, phone, account } = props.supplier
  const [supplier_info, setSupplierInfo] = useState({ name, account, phone, email })
  const dispatch = useDispatch()

  const handle_save = () => {
    // if (account_name == '' || iban === '' || swift == '')
    // Do we need validation that all the account fields was filled or its okay to fill partly

    dispatch(action_supplier.update_supplier(supplier_info, props.supplier.uuid))
    dispatch(action_supplier.get_suppliers())
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const handle_delete = () => {
    dispatch(action_supplier.delete_supplier(props.supplier.uuid))
    dispatch(action_supplier.get_suppliers())
    setSupplierInfo({ ...supplier_info })
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  let account_name
  let iban
  let swift
  if (!supplier_info.account) {
    account_name = ''
    iban = ''
    swift = ''
  } else {
    account_name = supplier_info.account.account_name
    iban = supplier_info.account.iban
    swift = supplier_info.account.swift
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['name']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['phone']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['email']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['account_name']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {'IBAN'}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {'SWIFT'}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, name: e.target.value })} defaultValue={supplier_info.name} />
            </td>
            <td>
              <input type='tel' onChange={(e) => setSupplierInfo({ ...supplier_info, phone: e.target.value })} defaultValue={supplier_info.phone} />
            </td>
            <td>
              <input type='email' onChange={(e) => setSupplierInfo({ ...supplier_info, email: e.target.value })} defaultValue={supplier_info.email} />
            </td>
            <td>
              <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, account_name: e.target.value } })} defaultValue={account_name} />
            </td>
            <td>
              <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, iban: e.target.value } })} defaultValue={iban} />
            </td>
            <td>
              <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, swift: e.target.value } })} defaultValue={swift} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='btn btn-success m-2' onClick={handle_save}>
        {words_he['save']}
      </button>
      <button type='button' className='btn btn-danger m-2' onClick={handle_delete}>
        {words_he['delete']}
      </button>
    </div>
  )
}

export default UpdateSupplier
