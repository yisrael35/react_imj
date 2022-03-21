import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import * as action_event from '../../redux/Event/action'
import * as action_popUp from '../../redux/PopUp/action'
import EventNote from '@material-ui/icons/EventNote'
// import TextField from '@mui/material/TextField'
import { InputLabel, MenuItem, Select, Box, Grid, TextField, Typography } from '@mui/material/'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textField: {
    right: '2%',
    width: '20%',
    padding: '1%',
  },
  action_buttons: {
    paddingRight: '2%',
  },
  select_element: {
    right: '2%',
    width: '220px',
    padding: '1%',
  },
  title_type: {
    textAlign: 'center',
  },
}))

const words_he = require('../../utils/words_he').words_he
const { all_fields_filled } = require('../../utils/validate_helper')

const UpdateEvent = (props) => {
  const classes = useStyles()

  const [date, setDate] = useState(moment(props.data.from_date).format(`YYYY-MM-DD`))
  const [start_time, setStartTime] = useState(moment(props.data.from_date).format(`HH:mm:ss`))
  const [end_time, setEndTime] = useState(moment(props.data.to_date).format(`HH:mm:ss`))
  const [end_after_start, setEndAfterStart] = useState(true)
  const [event_info, setEventInfo] = useState({ name: '', from_date: '', to_date: '' })
  const [enable_send, setEnableSend] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    const get_event_by_id = async () => {
      const event = await dispatch(action_event.get_event_by_id(props.id))
      delete event.id
      delete event.user

      setEventInfo({ ...event })

      setDate(moment(event.from_date).format(`YYYY-MM-DD`))
      setStartTime(moment(event.from_date).format(`HH:mm`))
      setEndTime(moment(event.to_date).format(`HH:mm`))
    }
    get_event_by_id()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time, end_after_start, event_info])

  useEffect(() => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }

    setEventInfo({ ...event_info, from_date: `${date} ${start_time}`, to_date: `${date} ${end_time}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time])

  const validate_fields = () => {
    if (all_fields_filled([date])) {
      return true
    }
    return false
  }

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

    // console.log(date)
    dispatch(action_event.update_event(event_info, props.id))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_event.get_events({ limit, offset }))

    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  useEffect(() => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }

    setEventInfo({ ...event_info, from_date: `${date} ${start_time}`, to_date: `${date} ${end_time}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, start_time, end_time])

  return (
    <Box
      component='form'
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
            value={event_info.name}
            variant='standard'
            onChange={(e) => setEventInfo({ ...event_info, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + words_he['event_date']}
          </InputLabel>
          <Grid container item xs={12} justifyContent='center'>
            {date}
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            label={' * ' + words_he['start_time']}
            type='time'
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
        <Grid item xs={10} className={classes.action_buttons}>
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

// budget: null
// check_list: null
// clients: null
// comment: null
// from_date: "2022-02-21T22:00:00.000Z"
// id: "f56649a8-8531-11ec-ae77-005056c00001"
// name: "test the event if you want"
// status: "pending"
// suppliers: null
// to_date: "2022-02-21T22:00:00.000Z"
// type: "public"
// user: "yi"
