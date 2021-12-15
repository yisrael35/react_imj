import React from 'react'
import BigCalendar from 'react-big-calendar-like-google'
import moment from 'moment'
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
BigCalendar.momentLocalizer(moment)
const words_he = require('../utils/words_he').words_he
let allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k])
const Home = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <a href='http://localhost:3001/assets/README.md'>readme</a> */}

      <p>{words_he['welcome']}</p>
      {/* {props.name ? `${words_he['hello']} ` + props.name : `${words_he['please_sign_in']}`} */}
      <BigCalendar events={myEventsList}  startAccessor='startDate' endAccessor='endDate' />
    </div>
  )
}

const myEventsList = [
  {
    title: 'All Day Event very long title',
    bgColor: '#ff7f50',
    allDay: true,
    start: new Date(2021, 12, 0),
    end: new Date(2021, 12, 1),
  },
  {
    title: 'Long Event',
    start: new Date(2021, 12, 7),
    end: new Date(2021, 12, 10),
  },

  {
    title: 'DTS STARTS',
    bgColor: '#dc143c',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    title: 'DTS ENDS',
    bgColor: '#ff8c00',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    title: 'Some Event',
    bgColor: '#9932cc',
    start: new Date(2021, 12, 9, 0, 0, 0),
    end: new Date(2021, 12, 9, 0, 0, 0),
  },
  {
    title: 'Conference',
    bgColor: '#e9967a',
    start: new Date(2021, 12, 11),
    end: new Date(2021, 12, 13),
    desc: 'Big conference for important people',
  },
  {
    title: 'Meeting',
    bgColor: '#8fbc8f',
    start: new Date(2021, 12, 12, 10, 30, 0, 0),
    end: new Date(2021, 12, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    title: 'Lunch',
    bgColor: '#cd5c5c',
    start: new Date(2021, 12, 12, 12, 0, 0, 0),
    end: new Date(2021, 12, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    title: 'Happy Hour',
    start: new Date(2021, 12, 12, 12, 0, 0, 0),
    end: new Date(2021, 12, 12, 13, 0, 0, 0),
    desc: 'Power lunch happy hour',
  },
  {
    title: 'Meeting',
    bgColor: '#da70d6',
    start: new Date(2021, 12, 12, 14, 0, 0, 0),
    end: new Date(2021, 12, 12, 15, 0, 0, 0),
  },
  {
    title: 'Happy Hour',
    bgColor: '#eee8aa',
    start: new Date(2021, 12, 17, 17, 0, 0, 0),
    end: new Date(2021, 12, 17, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    title: 'Dinner',
    bgColor: '#98fb98',
    start: new Date(2021, 12, 15, 20, 0, 0, 0),
    end: new Date(2021, 12, 15, 21, 0, 0, 0),
  },
  {
    title: 'Birthday Party',
    bgColor: '#afeeee',
    start: new Date(2021, 12, 13, 7, 0, 0),
    end: new Date(2021, 12, 13, 10, 30, 0),
  },
  {
    title: 'Birthday Party 2',
    bgColor: '#db7093',
    start: new Date(2021, 12, 13, 7, 0, 0),
    end: new Date(2021, 12, 13, 10, 30, 0),
  },
  {
    title: 'Birthday Party 3',
    bgColor: '#cd853f',
    start: new Date(2021, 12, 13, 7, 0, 0),
    end: new Date(2021, 12, 13, 10, 30, 0),
  },
  {
    title: 'Late Night Event',
    bgColor: '#b0e0e6',
    start: new Date(2021, 12, 17, 19, 30, 0),
    end: new Date(2021, 12, 18, 2, 0, 0),
  },
  {
    title: 'Multi-day Event',
    start: new Date(2021, 12, 20, 19, 30, 0),
    end: new Date(2021, 12, 22, 2, 0, 0),
  },
]

export default Home
