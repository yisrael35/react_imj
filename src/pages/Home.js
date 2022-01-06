import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/he'
// moment().locale('he')

const localizer = momentLocalizer(moment)
// const words_he = require('../utils/words_he').words_he
const Home = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <a href='http://localhost:3001/assets/README.md'>readme</a> */}
      {/* <p>{words_he['welcome']}</p> */}
      <Calendar
        localizer={localizer}
        events={myEventsList}
        // views={['month']}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  )
}

const myEventsList = [
  {
    title: 'All Day Event very long title',
    color: '#ff7f50',
    allDay: true,
    start: '2022-01-01',
    end: '2022-01-01',
  },
  {
    title: 'Long Event',
    start: '2022-01-06',
    end: '2022-01-06',
  },
  {
    title: 'DTS STARTS',
    bgColor: '#dc143c',
    start: '2022-01-08',
    end: '2022-01-10',
  },

  {
    title: 'DTS ENDS',
    bgColor: '#ff8c00',
    start: '2022-02-16',
    end: '2022-02-16',
  },

  {
    title: 'Some Event',
    bgColor: '#9932cc',
    start: '2022-02-26',
    end: '2022-02-26',
  },
  {
    title: 'Conference',
    bgColor: '#e9967a',
    start: '2022-02-26',
    end: '2022-02-26',
    desc: 'Big conference for important people',
  },
  {
    title: 'Meeting',
    bgColor: '#8fbc8f',
    start: '2022-03-26',
    end: '2022-03-26',
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    title: 'Lunch',
    bgColor: '#cd5c5c',
    start: '2022-01-26',
    end: '2022-01-26',
    desc: 'Power lunch',
  },
  {
    title: 'Happy Hour',
    start: '2022-02-13',
    end: '2022-02-13',
    desc: 'Power lunch happy hour',
  },
  {
    title: 'Meeting',
    bgColor: '#da70d6',
    start: '2022-02-12',
    end: '2022-02-12',
  },
]

export default Home
