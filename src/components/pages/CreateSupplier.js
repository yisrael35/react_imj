import React, { useState } from 'react'
import '../../css/suppliers.css'
import { useDispatch } from 'react-redux'
import * as action_supplier from '../../redux/Supplier/action'
import * as action_popUp from '../../redux/PopUp/action'

const words_he = require('../../utils/words_he').words_he

const CreateSupplier = () => {
  const [supplier_info, setSupplierInfo] = useState({ name: '', account: {account_name: '', iban: '', swift: ''}, phone: '', email: '' })
  const dispatch = useDispatch()

  const handle_save = () => {
    dispatch(action_supplier.create_supplier(supplier_info))
    dispatch(action_supplier.get_suppliers())
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  let account_name 
  let iban 
  let swift 
  if (!supplier_info.account) {
    account_name = ''
    iban =  ''
    swift = '' 
  } else {
    account_name = supplier_info.account.account_name
    iban = supplier_info.account.iban
    swift = supplier_info.account.swift
  }

  return (
    <div>
      <h3>{words_he['new_supplier']}</h3>
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
            <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account:{ ...supplier_info.account, account_name: e.target.value}})} defaultValue={account_name} />
          </td>
          <td>
            <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account:{ ...supplier_info.account, iban: e.target.value}})} defaultValue={iban} />
          </td>
          <td>
            <input type='text' onChange={(e) => setSupplierInfo({ ...supplier_info, account:{ ...supplier_info.account, swift: e.target.value}})} defaultValue={swift} />
          </td>
          <td>
            <button type='button' className='btn btn-info' onClick={handle_save}>
              {words_he['save']}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default CreateSupplier
