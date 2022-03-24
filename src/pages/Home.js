import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/he'

//redux
import * as action_home from '../redux/Home/action'
import * as actionSnackBar from '../redux/SnackBar/action'
import * as action_popUp from '../redux/PopUp/action'

//components
import CreateEvent from '../components/pages/CreateEvent'
import DisplayEvent from '../components/pages/DisplayEvent'
import FloatingButton from '../components/general/FloatingButton'
import Event from '@material-ui/icons/Event'

//services
import workerInstances from '../services'
import { words_he } from '../utils/words_he'

const localizer = momentLocalizer(moment)
//  Yisrael Bar  yisrael35@gmail.com
const Home = (props) => {
  const events = useSelector((state) => state.home.events)
  const token = useSelector((state) => state.auth.token)
  const saved_date = useSelector((state) => state.home.saved_date)
  const permissions = useSelector((state) => state.auth.permissions)

  const dispatch = useDispatch()
  //connect to the ws
  useEffect(() => {
    workerInstances.init_ws({ token })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //receive message from the ws
  useEffect(() => {
    const receiveData = (message) => {
      if (message?.data?.type === 'login' && !message?.data?.error) {
        // const response = { ...message.data }
        dispatch(actionSnackBar.setSnackBar('success', words_he['login_success'], 2000))
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

    dispatch(action_home.save_date(date))
    dispatch(action_home.get_events(data))
  }

  const handle_add_event = () => {
    const content = <CreateEvent />
    dispatch(action_popUp.setPopUp(content))
  }
  const event_icon = <Event className='floating_button' />
  //translate calender values to hebrew
  const messages = {
    allDay: words_he['allDay'],
    previous: words_he['previous'],
    next: words_he['next'],
    today: words_he['today'],
    month: words_he['month'],
    week: words_he['week'],
    day: words_he['day'],
    agenda: words_he['agenda'],
    date: words_he['date'],
    time: words_he['time'],
    event: words_he['event'],
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h3 className='text-muted'>{words_he['welcome']}</h3>
      <Calendar
        messages={messages}
        onDoubleClickEvent={(event) => {
          const content = <DisplayEvent data={event} id={event.id} />
          dispatch(action_popUp.setPopUp(content))
        }}
        localizer={localizer}
        events={events}
        views={['month', 'week', 'day', 'agenda']}
        startAccessor='start'
        endAccessor='end'
        style={{ minHeight: 500, height: 'auto', marginRight: '14px', marginLeft: '14px' }}
        date={new Date(saved_date)}
        onNavigate={get_event_by_month}
        selectable={false}
      />
      {permissions !== 3 ? <FloatingButton handle_click={handle_add_event} button_content={event_icon} /> : <span></span>}
    </div>
  )
}

export default Home
