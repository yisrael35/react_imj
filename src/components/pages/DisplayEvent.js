import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import * as action_event from '../../redux/Event/action'

const words_he = require('../../utils/words_he').words_he

const DisplayEvent = (props) => {
  const [event_info, setEventInfo] = useState({})

  const dispatch = useDispatch()
  useEffect(() => {
    const get_event_by_id = async () => {
      const event = await dispatch(action_event.get_event_by_id(props.id))
      setEventInfo({ ...event })
    }
    get_event_by_id()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h3>{words_he['display_event']}</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <b>{'id'}</b>
            </td>
            <td>{event_info.id}</td>
          </tr>
          <tr>
            <td>
              <b>{words_he['event_name']}</b>
            </td>
            <td>{event_info.name}</td>
          </tr>
          <tr>
            <td>
              <b>{words_he['event_date']}</b>
            </td>
            <td>{moment(event_info.from_date).format('YYYY-MM-DD')}</td>
          </tr>
          <tr>
            <td>
              <b> {words_he['start_time']}</b>
            </td>
            <td>{moment(event_info.from_date).format('HH:mm:ss')}</td>
          </tr>
          <tr>
            <td>
              <b> {words_he['end_time']}</b>
            </td>
            <td>{moment(event_info.to_date).format('HH:mm:ss')}</td>
          </tr>
          <tr>
            <td>
              <b> {words_he['status']}</b>
            </td>
            <td>{words_he[event_info.status]}</td>
          </tr>
          <tr>
            <td>
              {' '}
              <b>{words_he['type']}</b>
            </td>
            <td>{words_he[event_info.type]}</td>
          </tr>
          <tr>
            <td>
              <b> {words_he['user']}</b>
            </td>
            <td>{event_info.user}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DisplayEvent

// budget: null
// check_list: null
// clients: null
// comment: null
// from_date: "2022-02-21T22:00:00.000Z"
// id: "f56649a8-8531-11ec-ae77-005056c00001"
// name: "test tde event if you want"
// status: "pending"
// suppliers: null
// to_date: "2022-02-21T22:00:00.000Z"
// type: "public"
// user: "yi"
