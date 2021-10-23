import React, { useState } from 'react'
import Select from 'react-select'
import MyDatePicker from '../components/DatePicker'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import '../css/bid.css'
import TableScheduleTimeEvent from '../components/TableScheduleTimeEvent'
import TableCosts from '../components/TableCosts'
import { useDispatch } from 'react-redux'
import * as action_bid from '../redux/Bid/action'

const words_he = require('../utils/words_he').words_he
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

const Bid = (props) => {
  const classes = useStyles()

  let data = {}
  const [date, setDate] = useState(moment().format(`yyyy-MM-DD`))
  const [event_type, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [language, setlanguages] = useState('')
  const [client_name, setClientName] = useState('')
  const [event_name, setEventName] = useState('')
  const [max_participants, setMaxParticipants] = useState()
  const [min_participants, setMinParticipants] = useState()
  const [schedule_time_event, setScheduleTimeEvent] = useState([{ from: '', to: '', describe: '' }])
  const [costs, setCosts] = useState([{ description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
  //for the calculation
  const [total_b_discount, setTotalBDiscount] = useState(0)
  const [total_a_discount, setTotalADiscounts] = useState(0)
  const [discount, setDiscount] = useState(0)

  data = { date, event_type, location, client_name, event_name, language, schedule_time_event, costs, max_participants, min_participants }
  console.log(data)
  const handle_clear = () => {
    setDate(moment().format(`yyyy-MM-DD`))
    setEventType('')
    setLocation('')
    setlanguages('')
    setClientName('')
    setEventName('')
    setMaxParticipants(0)
    setMinParticipants(0)
    setScheduleTimeEvent([{ from: '', to: '', describe: '' }])
    setCosts([{ description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
    setTotalBDiscount(0)
    setTotalADiscounts(0)
    setDiscount(0)
  }
  const dispatch = useDispatch()
  const handle_save = () => {
    //TODO -- validate data
    // dispatch(action_bid.create_new_bid(data))
  }
  const handle_cancel_and_exit = () => {
    //TODO make a window pop with a message
  }
  const handle_email = () => {}
  const handle_pdf = () => {}
  return (
    <div style={{ padding: '30px' }}>
      <MyDatePicker date={date} setDate={setDate} className={MyDatePicker} />
      <form>
        <div>
          <Select
            className={classes.textField}
            // style={{'width:40px'}}
            placeholder={'languages'}
            options={languages}
            id='languages'
            label='languages'
            onChange={(e) => {
              setlanguages(e.value)
            }}
          />
          <button type='button' className='btn btn-info' onClick={handle_pdf}>
            pdf
          </button>
          <button type='button' className='btn btn-info' onClick={handle_email}>
            email
          </button>
        </div>
        <div> </div>
        <title> {words_he['new_bid']}</title>
        <p>bid id: 5353526</p>
        <Select
          className={classes.textField}
          // style={{'width:40px'}}
          placeholder={'event type'}
          options={events_type}
          id='event_type'
          label='event type'
          onChange={(e) => {
            setEventType(e.value)
          }}
        />
        <Select
          className={classes.textField}
          // style={{'width:40px'}}
          placeholder={'location'}
          options={locations}
          id='location'
          label='location'
          onChange={(e) => {
            setLocation(e.value)
          }}
        />
        <div>
          <label>
            client Name:
            <input
              type='text'
              name='client_Name'
              onChange={(e) => {
                setClientName(e.target.value)
              }}
            />
          </label>
        </div>

        <div>
          <label>
            event Name:
            <input
              type='text'
              name='event_Name'
              onChange={(e) => {
                setEventName(e.target.value)
              }}
            />
          </label>
        </div>
        <label>
          amount prticipnts
          <input
            min='0'
            type='number'
            placeholder='minimum'
            onChange={(e) => {
              setMinParticipants(e.target.value)
            }}
          />
          <input
            min='0'
            type='number'
            placeholder='maximum '
            onChange={(e) => {
              setMaxParticipants(e.target.value)
            }}
          />
        </label>
        <div>
          <label>
            comments
            <textarea></textarea>
          </label>
        </div>

        <div></div>
      </form>
      <TableScheduleTimeEvent setScheduleTimeEvent={setScheduleTimeEvent} schedule_time_event={schedule_time_event} />
      <TableCosts setCosts={setCosts} costs={costs} />
      <Select
        className={classes.textField}
        placeholder={'currency'}
        options={currencies}
        id='currency'
        label='currency'
        onChange={(e) => {
          setlanguages(e.value)
        }}
      />
      <Select
        className={classes.textField}
        placeholder={'bid_status'}
        options={bid_status}
        id='bid_status'
        label='bid_status'
        onChange={(e) => {
          setlanguages(e.value)
        }}
      />
      <div>
        <div>total before discount {total_b_discount} nis</div>
        <div>total discount {discount} nis</div>
        <div>total after discount {total_a_discount} nis</div>
      </div>
      <div>
        <button type='button' className='btn btn-info' onClick={handle_clear}>
          clear all
        </button>
        <button type='button' className='btn btn-info' onClick={handle_save}>
          save
        </button>
        <button type='button' className='btn btn-info' onClick={handle_cancel_and_exit}>
          cancel and exit
        </button>
      </div>
    </div>
  )
}

export default Bid

const events_type = [
  { value: 'id1', label: 'public' },
  { value: 'id2', label: 'private' },
  { value: 'id3', label: 'inside' },
  { value: 'id3', label: 'photoshot' },
]
const locations = [
  { value: 'il', label: 'israel' },
  { value: 'usa', label: 'usa' },
  { value: 'br', label: 'brasil' },
]
const languages = [
  { value: 'he', label: 'hebrew' },
  { value: 'en', label: 'english' },
]
const currencies = [
  { value: 'nis', label: 'nis' },
  { value: 'usd', label: 'usd' },
]
const bid_status = [
  { value: 'approved', label: 'approved' },
  { value: 'pendding', label: 'pendding' },
]
