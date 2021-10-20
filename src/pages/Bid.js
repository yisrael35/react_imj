import React, { useState } from 'react'
import Select from 'react-select'
import MyDatePicker from '../components/DatePicker'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
// import '../css/bid.css'
// import { useDispatch } from 'react-redux'
// import * as action_bid from '../redux/Bid/action'

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
  // const dispatch = useDispatch()
  // dispatch(action_bid.create_new_bid(data))
  const classes = useStyles()

  let data = {}
  const [date, setDate] = useState(moment().format(`yyyy-MM-DD`))
  const [event_type, setEventType] = useState('')
  data = { date, event_type }
  console.log(data);
  const options = [
    { value: 'id1', label: 'puvlic' },
    { value: 'id2', label: 'priovate' },
    { value: 'id3', label: 'somthing' },
  ]

  return (
    <div>
      <title> {words_he['new_bid']}</title>
      <p>bid id: 5353526</p>
      <MyDatePicker date={date} setDate={setDate} />
      <Select
        className={classes.textField}
        // style={{'width:40px'}}
        placeholder={'event type'}
        options={options}
        id='event_type'
        label='event type'
        onChange={(e) => {
          setEventType(e.value)
        }}
      />
    </div>
  )
}

export default Bid
