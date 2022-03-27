import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyDatePicker from '../general/DatePicker'
import moment from 'moment'
import * as action_popUp from '../../redux/PopUp/action'
import * as action_event from '../../redux/Event/action'
import EventAvailable from '@material-ui/icons/EventAvailable'
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

const CreateEvent = (props) => {
  const classes = useStyles()

  const user = useSelector((state) => state.auth.userContent)
  const [date, setDate] = useState(moment().format(`YYYY-MM-DD`))
  const [start_time, setStartTime] = useState('10:00')
  const [end_time, setEndTime] = useState('11:00')
  const [end_after_start, setEndAfterStart] = useState(true)
  const [enable_send, setEnableSend] = useState(false)

  const [event_info, setEventInfo] = useState({ name: '', user: user.id, from_date: '', to_date: '' })
  const dispatch = useDispatch()

  const handle_save = () => {
    if (start_time >= end_time) {
      setEndAfterStart(false)
      return
    } else {
      setEndAfterStart(true)
    }
    event_info.status = 'approved'
    dispatch(action_event.create_event(event_info))
    setTimeout(() => {
      const limit = props.limit
      const offset = props.offset
      dispatch(action_event.get_events({ limit, offset }))
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

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

  const validate_fields = () => {
    if (event_info.name && event_info.name.trim() !== '' && event_info.from_date && event_info.to_date && event_info.user && end_after_start) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_info, date, start_time, end_time])

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
              {words_he['new_event']}
            </Typography>
          </Grid>
          <EventAvailable style={{ width: '80px', height: '80px', margin: '4px' }} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard-required'
            label={' * ' + words_he['event_name']}
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setEventInfo({ ...event_info, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          {/* <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + words_he['event_date']}
          </InputLabel> */}
          <Grid container item xs={12} justifyContent='center'>
            <MyDatePicker date={date} setDate={setDate} className={MyDatePicker} label={' * ' + words_he['event_date']} />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            label={' * ' + words_he['start_time']}
            type='time'
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
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
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            value={end_time}
            onChange={(e) => {
              setEndTime(e.target.value)
            }}
          />
          {!end_after_start && <span style={{ color: 'red', display: 'block' }}> {words_he['end_after_start']}</span>}
        </Grid>
        <Grid item xs={10}>
          <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + words_he['type']}
          </InputLabel>

          <Select
            variant='standard'
            defaultValue={'public'}
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

export default CreateEvent
