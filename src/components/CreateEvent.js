import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyDatePicker from '../components/DatePicker'
import moment from 'moment'
import * as action_popUp from '../redux/PopUp/action'
import * as action_event from '../redux/Event/action'

const words_he = require('../utils/words_he').words_he

const CreateEvent = () => {
  const user = useSelector((state) => state.auth.userContent)
  const [date, setDate] = useState(moment().format(`YYYY-MM-DD`))
  const [start_time, setStartTime] = useState('10:00')
  const [end_time, setEndTime] = useState('11:00')
  const [end_after_start, setEndAfterStart] = useState(true)

  const [event_info, setEventInfo] = useState({ name: '', user: user.id, from_date: '', to_date: '' })
  const dispatch = useDispatch()

  const handle_save = () => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }
    dispatch(action_event.create_event(event_info))
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type='text' onChange={(e) => setEventInfo({ ...event_info, name: e.target.value })} />
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

export default CreateEvent
