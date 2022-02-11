import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MyDatePicker from '../general/DatePicker'
import moment from 'moment'
import Select from 'react-select'
import * as action_event from '../../redux/Event/action'
import * as action_popUp from '../../redux/PopUp/action'

const words_he = require('../../utils/words_he').words_he

const UpdateEvent = (props) => {
  const [date, setDate] = useState(moment().format(`YYYY-MM-DD`))
  const [start_time, setStartTime] = useState('10:00')
  const [end_time, setEndTime] = useState('11:00')
  const [end_after_start, setEndAfterStart] = useState(true)
  const [event_info, setEventInfo] = useState({ name: '', from_date: '', to_date: '' })

  const dispatch = useDispatch()
  useEffect(() => {
    const get_event_by_id = async () => {
      const event = await dispatch(action_event.get_event_by_id(props.id))
      delete event.id
      delete event.user

      setEventInfo({ ...event })
      //TODO --
      setDate(moment(event.from_date).format(`YYYY-MM-DD`))

      setStartTime(moment(event.from_date).format(`HH:mm`))
      setEndTime(moment(event.to_date).format(`HH:mm`))
    }
    get_event_by_id()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handle_save = () => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }
    for (const [key, val] of Object.entries(event_info)) {
      if (!val || val === null) {
        delete event_info[key]
      }
    }

    console.log(event_info)
    dispatch(action_event.update_event(event_info, props.id))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_event.get_events({limit, offset}))

    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  useEffect(() => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }

    setEventInfo({ ...event_info, from_date: `${date} ${start_time}`, to_date: `${date} ${end_time}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time])

  return (
    <div>
      <h3>{words_he['new_event']}</h3>
      <table>
        <thead>
          <tr>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['event_name']}
            </th>
            <th scope='col' className='border-0 text-uppercase font-medium pl-4'>
              {words_he['event_date']}
            </th>
            <th> {words_he['start_time']}</th>
            <th> {words_he['end_time']}</th>
            <th> {words_he['status']}</th>
            <th> {words_he['type']}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type='text' value={event_info.name} onChange={(e) => setEventInfo({ ...event_info, name: e.target.value })} />
            </td>
            <td>
              <MyDatePicker date={date} setDate={setDate} className={MyDatePicker} />
            </td>
            <td>
              <input
                type='time'
                value={start_time}
                onChange={(e) => {
                  setStartTime(e.target.value)
                }}
              />
            </td>
            <td>
              <input
                type='time'
                value={end_time}
                onChange={(e) => {
                  setEndTime(e.target.value)
                }}
              />
              {!end_after_start && <span style={{ color: 'red' }}> {words_he['end_after_start']}</span>}
            </td>
            <td>
              <Select
                className={'select'}
                placeholder={words_he[event_info.status]}
                options={statuses}
                id='statuses'
                label={words_he['status']}
                onChange={(e) => {
                  setEventInfo({ ...event_info, status: e.value })
                }}
              />
            </td>
            <td>
              <Select
                className={'select'}
                placeholder={words_he[event_info.type]}
                options={types}
                id='types'
                label={words_he['type']}
                onChange={(e) => {
                  setEventInfo({ ...event_info, type: e.value })
                }}
              />
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

export default UpdateEvent

const statuses = [
  { value: 'pending', label: words_he['pending'] },
  { value: 'approved', label: words_he['approved'] },
  { value: 'canceled', label: words_he['canceled'] },
]
const types = [
  { value: 'private', label: words_he['private'] },
  { value: 'public', label: words_he['public'] },
  { value: 'inside', label: words_he['inside'] },
  { value: 'photo_shot', label: words_he['photo_shot'] },
]
// budget: null
// check_list: null
// clients: null
// comment: null
// from_date: "2022-02-21T22:00:00.000Z"
// id: "f56649a8-8531-11ec-ae77-005056c00001"
// name: "test the event if you want"
// status: "pending"
// suppliers: null
// to_date: "2022-02-21T22:00:00.000Z"
// type: "public"
// user: "yi"
