import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import * as action_event from '../../redux/Event/action'
import * as action_popUp from '../../redux/PopUp/action'

import { InputLabel, MenuItem, Select, Box, Grid, TextField, Typography } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'
import EventNote from '@material-ui/icons/EventNote'

import MyDatePicker from '../general/DatePicker'

const words_he = require('../../utils/words_he').words_he

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '20%',
    padding: '1%',
  },
  select_element: {
    width: '220px',
    padding: '1%',
  },
  title_type: {
    textAlign: 'center',
  },
}))

const UpdateEvent = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  
  const { from_date, to_date, name, status, type } = props.data

  const [date, setDate] = useState(moment(from_date, ['HH:mm:ss YYYY-MM-DD']).format('YYYY-MM-DD'))
  const [start_time, setStartTime] = useState(moment(from_date, ['HH:mm:ss YYYY-MM-DD']).format(`HH:mm`))
  const [end_time, setEndTime] = useState(moment(to_date, ['HH:mm:ss YYYY-MM-DD']).format(`HH:mm`))
  const [end_after_start, setEndAfterStart] = useState(true)
  const [event_info, setEventInfo] = useState({ name, status: convert_status(status), type: convert_type(type), from_date, to_date })
  const [enable_send, setEnableSend] = useState(false)


  useEffect(() => {
    if (end_after_start && start_time && end_time && date && event_info.name) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time, end_after_start, event_info])

  useEffect(() => {
    if (!moment(`${date} ${start_time}`).isBefore(`${date} ${end_time}`)) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }

    setEventInfo({ ...event_info, from_date: `${date} ${start_time}`, to_date: `${date} ${end_time}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time])

  const handle_save = () => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }
    for (const [key, val] of Object.entries(event_info)) {
      if (!val || val === null) {
        delete event_info[key]
      }
    }

    dispatch(action_event.update_event(event_info, props.id))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_event.get_events({ limit, offset }))

    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={10}>
          <Grid container justifyContent='center'>
            <Typography className={classes.title} variant='h4' sx={{ color: 'text.secondary' }}>
              {words_he['edit_event']}
            </Typography>
          </Grid>
          <EventNote style={{ width: '80px', height: '80px', margin: '4px' }} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard-required'
            label={' * ' + words_he['event_name']}
            inputProps={{ style: { textAlign: 'center' } }}
            value={event_info.name}
            variant='standard'
            onChange={(e) => setEventInfo({ ...event_info, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container item xs={12} justifyContent='center'>
            <MyDatePicker date={date} setDate={setDate} className={MyDatePicker} label={' * ' + words_he['event_date']} />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            label={' * ' + words_he['start_time']}
            type='time'
            inputProps={{ style: { textAlign: 'center' } }}
            format='24'
            variant='standard'
            value={start_time}
            onChange={(e) => {
              setStartTime(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            label={' * ' + words_he['end_time']}
            type='time'
            inputProps={{ style: { textAlign: 'center' } }}
            variant='standard'
            value={end_time}
            onChange={(e) => {
              setEndTime(e.target.value)
            }}
          />
          {!end_after_start && <span style={{ color: 'red', display: 'block' }}> {words_he['end_after_start']}</span>}
        </Grid>
        <Grid item xs={10}>
          <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + words_he['status']}
          </InputLabel>

          <Select
            variant='standard'
            value={String(event_info.status)}
            // defaultValue={String(event_info.status)}
            className={classes.select_element}
            onChange={(e) => {
              setEventInfo({ ...event_info, status: e.target.value })
            }}
          >
            <MenuItem value='pending'>{words_he['pending']}</MenuItem>
            <MenuItem value='approved'>{words_he['approved']}</MenuItem>
            <MenuItem value='canceled'>{words_he['canceled']}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={10}>
          <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + words_he['type']}
          </InputLabel>

          <Select
            variant='standard'
            value={String(event_info.type)}
            // defaultValue={String(event_info.type)}
            className={classes.select_element}
            onChange={(e) => {
              setEventInfo({ ...event_info, type: e.target.value })
            }}
          >
            <MenuItem value='private'>{words_he['private']}</MenuItem>
            <MenuItem value='public'>{words_he['public']}</MenuItem>
            <MenuItem value='inside'>{words_he['inside']}</MenuItem>
            <MenuItem value='photo_shot'>{words_he['photo_shot']}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={10}>
          <Grid container justifyContent='center'>
            <Grid item>
              <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
                {words_he['save']}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UpdateEvent

const convert_status = (status) => {
  switch (status) {
    case words_he['pending']:
      return 'pending'
    case words_he['approved']:
      return 'approved'
    case words_he['canceled']:
      return 'canceled'
    default:
      break
  }
}
const convert_type = (type) => {
  switch (type) {
    case words_he['private']:
      return 'private'
    case words_he['public']:
      return 'public'
    case words_he['inside']:
      return 'inside'
    case words_he['photo_shot']:
      return 'photo_shot'
    default:
      break
  }
}
