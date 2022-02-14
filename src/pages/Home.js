import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/he'
import * as action_home from '../redux/Home/action'
import * as actionSnackBar from '../redux/SnackBar/action'
import * as action_popUp from '../redux/PopUp/action'
import CreateEvent from '../components/pages/CreateEvent'
import DisplayEvent from '../components/pages/DisplayEvent'
import workerInstances from '../services'
const localizer = momentLocalizer(moment)
const words_he = require('../utils/words_he').words_he

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
        dispatch(actionSnackBar.setSnackBar('success', response.content, 2000))
      } else if (message?.data?.type === 'events' && !message?.data?.error) {
        const response = { ...message.data }
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
  const get_event_by_month = (date) => {
    const data = { from_date: moment(date).startOf('month').format('YYYY-MM-DD'), to_date: moment(date).endOf('month').format('YYYY-MM-DD') }
    dispatch(action_home.get_events(data))
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className='btn btn-info'
        onClick={() => {
          const content = <CreateEvent />
          dispatch(action_popUp.setPopUp(content))
        }}
      >
        {words_he['create_event']}
      </button>
      <Calendar
        onDoubleClickEvent={(event) => {
          const content = <DisplayEvent data={event} id={event.id} />
          dispatch(action_popUp.setPopUp(content))
        }}
        localizer={localizer}
        events={events}
        views={['month', 'day', 'agenda']}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onNavigate={get_event_by_month}
      />
    </div>
  )
}

export default Home
