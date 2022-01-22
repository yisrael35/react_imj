import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/he'
import * as action_home from '../redux/Home/action'
import * as actionSnackBar from '../redux/SnackBar/action'
import workerInstances from '../services'

const localizer = momentLocalizer(moment)
// const words_he = require('../utils/words_he').words_he
const Home = (props) => {
  const events = useSelector((state) => state.home.events)
  const token = useSelector((state) => state.auth.token)

  const dispatch = useDispatch()
  //connect to the ws
  useEffect(() => {
    workerInstances.init_ws({ token })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //receive message from the ws
  useEffect(() => {
    const receiveData = (message) => {
      if ((message?.data?.type === 'login' || message?.data?.type === 'notification') && !message?.data?.error) {
        const response = { ...message.data }
        // console.log(response)
        dispatch(actionSnackBar.setSnackBar('success', response.content, 2000))
      } else if (message?.data?.type === 'events' && !message?.data?.error) {
        const response = { ...message.data }
        // console.log(response)
        dispatch(action_home.set_events(response.content))
      } else {
        // const response = { ...message.data }
        // console.log(response)
      }
    }
    workerInstances.addEventListener('message', receiveData)
    return () => {
      workerInstances.removeEventListener('message', receiveData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {/* <a href='http://localhost:3001/assets/README.md'>readme</a> */}
      {/* <p>{words_he['welcome']}</p> */}
      {/* <button
        onClick={() => {
          const data = { from_date: '2022-01-14', to_date: '2022-01-14' }
          dispatch(action_home.get_events(data))
        }}
      >
        test - get event
      </button> */}
      <Calendar
        localizer={localizer}
        events={events}
        views={['month']}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  )
}

export default Home
