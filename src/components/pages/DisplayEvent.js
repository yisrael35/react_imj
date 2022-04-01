import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import * as action_event from '../../redux/Event/action'

import { GrStatusInfo } from 'react-icons/gr'
import { BiTimeFive, BiUser, BiBuildingHouse } from 'react-icons/bi'
import { BsCalendarDate } from 'react-icons/bs'
import { HiOutlineIdentification } from 'react-icons/hi'

const words_he = require('../../utils/words_he').words_he

const DisplayEvent = (props) => {
  const dispatch = useDispatch()

  const [event_info, setEventInfo] = useState({})
  const [isShown, setIsShown] = useState('none')

  useEffect(() => {
    const get_event_by_id = async () => {
      const event = await dispatch(action_event.get_event_by_id(props.id))
      setEventInfo({ ...event })
    }
    get_event_by_id()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const iconStyles = {
    fontSize: '120%',
    margin: '6px',
  }
  const hoverStyles = { position: 'absolute', backgroundColor: '#505050', color: 'white', paddingLeft: '2%', paddingRight: '2%' }

  return (
    <div>
      <h3 style={{ margin: '1%', 'margin-bottom': '7%' }}>{event_info.name}</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <BsCalendarDate style={iconStyles} onMouseEnter={() => setIsShown('date')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'date' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <b>{moment(event_info.from_date).format('DD-MM-YYYY')}</b>
            </td>
          </tr>
          <tr>
            <td>
              <BiTimeFive style={iconStyles} onMouseEnter={() => setIsShown('time')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'time' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <b>{moment(event_info.to_date).format('HH:mm') + ' - ' + moment(event_info.from_date).format('HH:mm')}</b>
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <GrStatusInfo style={iconStyles} onMouseEnter={() => setIsShown('status')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'status' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <b>{words_he[event_info.status]}</b>
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <BiBuildingHouse style={iconStyles} onMouseEnter={() => setIsShown('type')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'type' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <b>{words_he[event_info.type]}</b>
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <BiUser style={iconStyles} onMouseEnter={() => setIsShown('client_name')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'client_name' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <b>{event_info.user}</b>
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <HiOutlineIdentification style={iconStyles} onMouseEnter={() => setIsShown('id')} onMouseLeave={() => setIsShown('none')} />
              {isShown === 'id' && <div style={hoverStyles}> {words_he[isShown]} </div>}
            </td>
            <td>
              <div style={{ fontSize: '80%' }}>
                <b>{event_info.id}</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DisplayEvent

