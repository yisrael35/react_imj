import React, { useState } from 'react'
import '../../css/clients.css'
import { useDispatch } from 'react-redux'
import * as action_client from '../../redux/Client/action'
import * as action_popUp from '../../redux/PopUp/action'

const words_he = require('../../utils/words_he').words_he

const CreateClient = () => {
  const [client_info, setClientInfo] = useState({ name: '', type: words_he['private'], phone: '', email: '' })
  const dispatch = useDispatch()

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
    dispatch(action_client.create_client(data))
    dispatch(action_client.get_clients())
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  return (
    <div>
      <h3>{words_he['new_client']}</h3>
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
          </tr>
        </tbody>
      </table>
      <button type='button' className='btn btn-info' onClick={handle_save}>
        {words_he['save']}
      </button>
    </div>
  )
}

export default CreateClient
