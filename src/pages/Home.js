import React, { useEffect } from 'react'

//calendar
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/he'

//redux
import { useDispatch, useSelector } from 'react-redux'
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
import Dictionary from '../utils/dictionary'

const localizer = momentLocalizer(moment)

//  Yisrael Bar  yisrael35@gmail.com
const Home = (props) => {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.home.events)
  const token = useSelector((state) => state.auth.token)
  const saved_date = useSelector((state) => state.home.saved_date)
  const permissions = useSelector((state) => state.auth.permissions)
  const dictionary = Dictionary()

  //connect to the ws
  useEffect(() => {
    workerInstances.init_ws({ token })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //receive message from the ws
  useEffect(() => {
    const receiveData = (message) => {
      if (message?.data?.type === 'login' && !message?.data?.error) {
        dispatch(actionSnackBar.setSnackBar('success', dictionary['login_success'], 2000))
      } else if (message?.data?.type === 'events' && !message?.data?.error) {
        const response = { ...message.data }
        dispatch(action_home.set_events(response.content))
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
    date: dictionary['date'],
    time: dictionary['time'],
    event: dictionary['event'],
    allDay: dictionary['allDay'],
    week: dictionary['week'],
    work_week: dictionary['work_week'],
    day: dictionary['day'],
    month: dictionary['month'],
    previous: dictionary['previous'],
    next: dictionary['next'],
    yesterday: dictionary['yesterday'],
    tomorrow: dictionary['tomorrow'],
    today: dictionary['today'],
    agenda: dictionary['agenda'],
    showMore: (total) => `${dictionary['show_more']}  ${total}+`,
    noEventsInRange: dictionary['noEventsInRange'],
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 className='text-muted'>{dictionary['welcome']}</h3>
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
