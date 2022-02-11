import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import MyDatePicker from '../components/general/DatePicker'
import moment from 'moment'
// import { makeStyles } from '@material-ui/core/styles'
import '../css/bid.css'
import TableScheduleTimeEvent from '../components/pages/TableScheduleTimeEvent'
import TableCosts from '../components/pages/TableCosts'
import EmailAndDownload from '../components/general/EmailAndDownload'
import CancelExit from '../components/general/CancelExit'
import * as action_bid from '../redux/Bid/action'
import * as action_utils from '../redux/Utils/action'
import * as action_popUp from '../redux/PopUp/action'
// import * as actionSnackBar from '../redux/SnackBar/action'

const words_he = require('../utils/words_he').words_he
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }))

const Bid = (props) => {
  // const classes = useStyles()

  const locations = useSelector((state) => state.utils.locations)
  const events_type = useSelector((state) => state.utils.events_type)
  const user = useSelector((state) => state.auth.userContent)
  const dispatch = useDispatch()

  const [date, setDate] = useState(moment().format(`YYYY-MM-DD`))
  const [event_type, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [language, setLanguage] = useState('he')
  const [status, setStatus] = useState('')
  const [currency, setCurrency] = useState('nis')
  const [client_name, setClientName] = useState('')
  const [event_name, setEventName] = useState('')
  const [event_comment, setEventComment] = useState(undefined)
  const [max_participants, setMaxParticipants] = useState()
  const [min_participants, setMinParticipants] = useState(0)
  const [schedule_time_event, setScheduleTimeEvent] = useState([{ start_time: '', end_time: '', activity_description: '' }])
  const [costs, setCosts] = useState([{ description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
  //for the calculation
  const [total_b_discount, setTotalBDiscount] = useState(0)
  const [total_a_discount, setTotalADiscounts] = useState(0)
  const [total_discount, setDiscount] = useState(0)

  useEffect(() => {
    dispatch(action_utils.get_utils())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let total_cost = 0
    let discount = 0
    for (const cost of costs) {
      total_cost += Number(cost.total_cost)
      discount += Number(cost.discount)
    }
    setDiscount(Number(discount).toFixed(2))
    setTotalBDiscount(Number(total_cost).toFixed(2))
    setTotalADiscounts(Number(total_cost - discount).toFixed(2))
  }, [costs])
  let req = {
    bid: {
      event_type,
      location,
      user: user.id,
      event_date: date,
      event_comment,
      client_name,
      event_name,
      max_participants,
      min_participants,
      total_b_discount,
      total_a_discount,
      total_discount,
      currency,
      status,
    },
    schedule_event: schedule_time_event,
    costs,
    // language,
  }
  if (language === 'he') {
    //TODO --USER TEXT HAVE TO BE IN he
  } else {
    //TODO --USER TEXT HAVE TO BE IN en
    // if (!/^[a-zA-Z0-9]+$/.test(val)) {
    //   dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_in_en']} ${val} `, 3000))
    //   // return
    // }
  }
  // console.log(req)
  const handle_clear = () => {
    setDate(moment().format(`YYYY-MM-DD`))
    setEventType('')
    setLocation('')
    setLanguage('')
    setStatus('')
    setCurrency('nis')
    setClientName('')
    setEventName('')
    setMaxParticipants(undefined)
    setMinParticipants(0)
    setScheduleTimeEvent([{ from: '', to: '', describe: '' }])
    setCosts([{ description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
    setTotalBDiscount(0)
    setTotalADiscounts(0)
    setDiscount(0)
  }

  const handle_save = async () => {
    //TODO -- validate data
    const bid_id = await dispatch(action_bid.create_new_bid(req))
    if (bid_id && typeof bid_id === 'number') {
      const content = <EmailAndDownload message={` bid number: ${bid_id} create successfully `} bid_id={bid_id} />
      dispatch(action_popUp.setPopUp(content))
    }
    props.history.push('/Home')
  }
  const handle_cancel_and_exit = () => {
    const content = <CancelExit />
    dispatch(action_popUp.setPopUp(content))
  }

  return (
    <div style={{ padding: '30px' }}>
      <label>
        {words_he['event_date']}
        <MyDatePicker date={date} setDate={setDate} className={MyDatePicker} />
      </label>
      <form>
        <div>
          <Select
            className={'select'}
            placeholder={words_he['languages']}
            options={languages}
            id='languages'
            label={words_he['languages']}
            onChange={(e) => {
              setLanguage(e.value)
            }}
          />
          {/* <button type='button' className='btn btn-info' onClick={handle_pdf}>
            pdf
          </button>
          <button type='button' className='btn btn-info' onClick={handle_email}>
            email
          </button> */}
        </div>

        <h3> {words_he['new_bid']} </h3>
        <Select
          className={'select'}
          placeholder={words_he['event_type']}
          options={events_type}
          id='event_type'
          label='event type'
          onChange={(e) => {
            setEventType(e.value)
          }}
        />
        <Select
          className={'select'}
          placeholder={words_he['location']}
          options={locations}
          id='location'
          label='location'
          onChange={(e) => {
            setLocation(e.value)
          }}
        />
        <div>
          <label>
            {words_he['client_name']}
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
            {words_he['event_name']}
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
          {words_he['prticipnts_amount']}
          <input
            min='0'
            type='number'
            placeholder={words_he['minimum']}
            onChange={(e) => {
              setMinParticipants(e.target.value)
            }}
          />
          <input
            min='0'
            type='number'
            placeholder={words_he['maximum']}
            onChange={(e) => {
              setMaxParticipants(e.target.value)
            }}
          />
        </label>
        <div>
          <label>
            {words_he['comments']}
            <textarea
              onChange={(e) => {
                setEventComment(e.target.value)
              }}
            ></textarea>
          </label>
        </div>

        <div></div>
      </form>
      <TableScheduleTimeEvent setScheduleTimeEvent={setScheduleTimeEvent} schedule_time_event={schedule_time_event} />
      <TableCosts
        setCosts={setCosts}
        costs={costs}
        calculation={{
          total_b_discount,
          total_a_discount,
          total_discount,
          setTotalBDiscount,
          setTotalADiscounts,
          setDiscount,
        }}
      />
      <Select
        className={'select'}
        placeholder={words_he['currency']}
        options={currencies}
        id='currency'
        label='currency'
        onChange={(e) => {
          setCurrency(e.value)
        }}
      />
      <Select
        // className={classes.textField}
        className={'select'}
        placeholder={words_he['bid_status']}
        options={bid_status}
        id='bid_status'
        label='bid_status'
        onChange={(e) => {
          setStatus(e.value)
        }}
      />
      <div>
        <div>
          {words_he['total_cost_before_discount']} {total_b_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
        </div>
        <div>
          {words_he['total_discount']} {total_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
        </div>
        <div>
          {words_he['total_cost_after_discount']} {total_a_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
        </div>
      </div>
      <div>
        <button type='button' className='btn btn-info' onClick={handle_clear}>
          {words_he['clear_all']}
        </button>
        <button type='button' className='btn btn-info' onClick={handle_save}>
          {words_he['save']}
        </button>
        <button type='button' className='btn btn-info' onClick={handle_cancel_and_exit}>
          {words_he['cencel_and_exit']}
        </button>
      </div>
    </div>
  )
}

export default Bid

const languages = [
  { value: 'he', label: words_he['hebrew'] },
  { value: 'en', label: 'English' },
]
const currencies = [
  { value: 'nis', label: words_he['nis'] },
  { value: 'usd', label: words_he['dollar'] },
]
const bid_status = [
  { value: 'draft', label: words_he['draft'] },
  { value: 'sent', label: words_he['sent'] },
  { value: 'approved', label: words_he['approved'] },
]

// {
//   "bid": {
//       "event_type": "1",
//       "location": "1",
//       "user": "1",
//       "event_date": "29-10-2021",
//       "event_comment": "29-10-2021",
//       "client_name": "eli",
//       "event_name": "intel",
//       "max_participants": "500",
//       "min_participants": "0",
//       "total_b_discount": "1600",
//       "total_a_discount": "1500",
//       "total_discount": "100",
//       "currency": "nis",
//       "status": "approved"
//   },
//   "schedule_event":[{ "start_time": "1", "end_time":"2", "activity_description": "3" },
//   { "start_time": "12", "end_time":"32", "activity_description": "34" }
//   ],
//   "costs": [{ "description": "4", "amount": "5", "unit_cost": "6", "total_cost": "7", "discount":"8", "comment": "9" }]
// }
