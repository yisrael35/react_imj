import React, { useState, useEffect } from 'react'
import '../../css/clients.css'
import { useDispatch } from 'react-redux'
import * as action_client from '../../redux/Client/action'
import * as action_popUp from '../../redux/PopUp/action'
import Select from 'react-select'
import * as actionSnackBar from '../../redux/SnackBar/action'

const { invalid_email, invalid_phone, all_fields_filled, invalid_email_characters } = require('../../utils/validate_helper')
const words_he = require('../../utils/words_he').words_he

const UpdateClient = (props) => {
  const { name, type, email, phone } = props.client
  const [client_info, setClientInfo] = useState({ name, type, phone, email })
  const dispatch = useDispatch()
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client_info])

  const validate_fields = () => {
    if (client_info.email) {
      if (invalid_email_characters(client_info.email)) {
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['invalid_character']} ${client_info.email} `, 3000))
        return false
      }
      if (invalid_email(client_info.email)) {
        return false
      }
    }
    if (client_info.phone && invalid_phone(client_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${client_info.phone} `, 3000))
      return false
    }

    if (all_fields_filled(client_info)) {
      return true
    }
    return false
  }

  const convert_type = (type) => {
    switch (type) {
      case words_he['private']:
        return 'private'
      case words_he['company']:
        return 'company'
      case words_he['department']:
        return 'department'
      default:
        break
    }
  }

  const get_data = (client_info) => {
    let data = {}
    for (let key in client_info) {
      if (client_info[key] != null) {
        data[key] = client_info[key]
      }
    }
    return { ...data, type: convert_type(data.type) }
  }

  const handle_save = () => {
    const data = get_data(client_info)
    dispatch(action_client.update_client(data, props.client.uuid))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_client.get_clients(limit, offset))
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const handle_delete = () => {
    dispatch(action_client.delete_client(props.client.uuid))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_client.get_clients(limit, offset))
    setClientInfo({ ...client_info })
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const types = [
    { value: words_he['private'], label: words_he['private'] },
    { value: words_he['company'], label: words_he['company'] },
    { value: words_he['department'], label: words_he['department'] },
  ]

  return (
    <div>
      {/* <form className='form-signin'>
        <label>
          {words_he['name'] + '  '}
          <input type='text' onChange={(e) => setClientInfo({ ...client_info, name: e.target.value })} defaultValue={client_info.name} />
        </label>
        <label>
          <div className='designed-div'>
            {words_he['type']}
            {/* <select onChange={(e) => setClientInfo({ ...client_info, type: e.value })}>
            <option value='grapefruit'>Grapefruit</option>
            <option value='lime'>Lime</option>
            <option selected value='coconut'>
              Coconut
            </option>
            <option value='mango'>Mango</option>
          </select> */}
      {/* <Select className={'designed-select'} placeholder={words_he['type']} options={types} label={words_he['type']} onChange={(e) => setClientInfo({ ...client_info, type: e.value })} />
          </div> */}
      {/* <ul>
            <li>
              <input
                type='radio'
                value={words_he['private']}
                name={'type'}
                checked={client_info.type === words_he['private']}
                onChange={(e) => setClientInfo({ ...client_info, type: e.target.value })}
              />{' '}
              {words_he['private']}
            </li>
            <li>
              <input
                type='radio'
                value={words_he['company']}
                name={'type'}
                checked={client_info.type === words_he['company']}
                onChange={(e) => console.log({ ...client_info, type: e.target.value })}
              />{' '}
              {words_he['company']}
            </li>
            <li>
              <input
                type='radio'
                value={words_he['department']}
                name={'type'}
                checked={client_info.type === words_he['department']}
                onChange={(e) => setClientInfo({ ...client_info, type: e.target.value })}
              />{' '}
              {words_he['department']}
            </li>
          </ul> }
      //   </label>
      //   <label>
      //     {words_he['phone']}
      //     <input type='tel' onChange={(e) => setClientInfo({ ...client_info, phone: e.target.value })} defaultValue={client_info.phone} />
      //   </label>
      //   <label>
      //     {words_he['email']}
      //     <input type='email' onChange={(e) => setClientInfo({ ...client_info, email: e.target.value })} defaultValue={client_info.email} />
      //   </label>
      //   <div>
      //     <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
      //       {words_he['save']}
      //     </button>
      //     <button type='button' className='btn btn-danger m-2' onClick={handle_delete}>
      //       {words_he['delete']}
      //     </button>
      //   </div>
      // </form> */}
      <table>
        <thead>
          <tr>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['name']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['type']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['phone']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['email']}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type='text' onChange={(e) => setClientInfo({ ...client_info, name: e.target.value })} defaultValue={client_info.name} />
            </td>
            <td>
              <ul>
                <li>
                  <input
                    type='radio'
                    value={words_he['private']}
                    name={'type'}
                    checked={client_info.type === words_he['private']}
                    onChange={(e) => setClientInfo({ ...client_info, type: e.target.value })}
                  />{' '}
                  {words_he['private']}
                </li>
                <li>
                  <input
                    type='radio'
                    value={words_he['company']}
                    name={'type'}
                    checked={client_info.type === words_he['company']}
                    onChange={(e) => setClientInfo({ ...client_info, type: e.target.value })}
                  />{' '}
                  {words_he['company']}
                </li>
                <li>
                  <input
                    type='radio'
                    value={words_he['department']}
                    name={'type'}
                    checked={client_info.type === words_he['department']}
                    onChange={(e) => setClientInfo({ ...client_info, type: e.target.value })}
                  />{' '}
                  {words_he['department']}
                </li>
              </ul>
            </td>
            <td>
              <input type='tel' onChange={(e) => setClientInfo({ ...client_info, phone: e.target.value })} defaultValue={client_info.phone} />
            </td>
            <td>
              <input type='email' onChange={(e) => setClientInfo({ ...client_info, email: e.target.value })} defaultValue={client_info.email} />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
        {words_he['save']}
      </button>
      <button type='button' className='btn btn-danger m-2' onClick={handle_delete}>
        {words_he['delete']}
      </button>{' '}
    </div>
  )
}

export default UpdateClient
