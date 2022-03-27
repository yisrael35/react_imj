import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputLabel, MenuItem, Select, Box, Grid, TextField, Typography, TextareaAutosize } from '@mui/material/'
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined'
import { makeStyles } from '@material-ui/core/styles'
import * as action_utils from '../../redux/Utils/action'
import * as action_popUp from '../../redux/PopUp/action'
import CreateClient from './CreateClient'
import CancelExit from '../general/CancelExit'
import moment from 'moment'

const words_he = require('../../utils/words_he').words_he
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '70%',
    margin: 'auto',
    direction: 'rtl',
  },
  select_language: {
    float: 'left',
    position: 'relative',
    width: '10%',
    marginLeft: '2%',
  },
  select_element: {
    width: '220px',
  },
  title: {
    padding: '2%',
  },
}))

const CreateBid = ({ bid_info, setBidInfo, handle_save_bid }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [enable_send, setEnableSend] = useState(false)
  const locations = useSelector((state) => state.utils.locations)
  const clients = useSelector((state) => state.utils.clients)
  const events_type = useSelector((state) => state.utils.events_type)

  useEffect(() => {
    dispatch(action_utils.get_utils())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bid_info])

  const validate_fields = () => {
    if (bid_info.event_type && bid_info.location && bid_info.user && bid_info.event_date && bid_info.client_id && bid_info.event_name && bid_info.max_participants) {
      return true
    }
    return false
  }

  const handle_create_client = (e) => {
    const new_client = <CreateClient />
    dispatch(action_popUp.setPopUp(new_client))
  }
  const handle_cancel_and_exit = () => {
    const content = <CancelExit />
    dispatch(action_popUp.setPopUp(content))
  }

  const handle_clear = () => {
    setBidInfo({
      event_type: '',
      location: '',
      event_date: moment().format('YYYY-MM-DD'),
      event_comment: '',
      client_id: '',
      event_name: '',
      max_participants: 0,
      language: 'he',
    })
  }
  console.log(bid_info)
  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Select
        variant='standard'
        className={classes.select_language}
        value={bid_info.language}
        id='standard-required'
        label={words_he['languages']}
        onChange={(e) => {
          setBidInfo({ ...bid_info, language: e.target.value })
        }}
      >
        {languages.map((element) => (
          <MenuItem value={element.value} key={element.value}>
            {element.label}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.root}>
        <Typography className={classes.title} variant='h4' sx={{ color: 'text.secondary' }}>
          {words_he['new_bid']}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              id='standard-required'
              label={words_he['event_name']}
              variant='standard'
              value={bid_info.event_name}
              inputProps={{ style: { textAlign: 'center' }}} 
              onChange={(e) => {
                setBidInfo({ ...bid_info, event_name: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id='standard-required'
              label={words_he['event_date']}
              type='date'
              variant='standard'
              value={bid_info.event_date}
              inputProps={{
                min: bid_info.event_date,
              }}
              onChange={(e) => {
                setBidInfo({ ...bid_info, event_date: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel required id='demo-simple-select-disabled-label'>
              {words_he['event_type']}
            </InputLabel>
            <Select
              required
              className={classes.select_element}
              id='event_type'
              value={bid_info.event_type}
              variant='standard'
              onChange={(e) => {
                setBidInfo({ ...bid_info, event_type: e.target.value })
              }}
            >
              {events_type?.map((element) => (
                <MenuItem value={element.value} key={element.value}>
                  {element.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              placeholder={words_he['comments']}
              value={bid_info.event_comment}
              onChange={(e) => {
                setBidInfo({ ...bid_info, event_comment: e.target.value })
              }}
            />{' '}
          </Grid>
          <Grid item xs={6}>
            <InputLabel required id='demo-simple-select-disabled-label'>
              {words_he['location']}{' '}
            </InputLabel>
            <Select
              variant='standard'
              required
              className={classes.select_element}
              id='location'
              value={bid_info.location}
              onChange={(e) => {
                setBidInfo({ ...bid_info, location: e.target.value })
              }}
            >
              {locations?.map((element) => (
                <MenuItem value={element.value} key={element.value}>
                  {element.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='standard-number'
              label={words_he['participants_amount']}
              type='number'
              required
              min='0'
              value={bid_info.max_participants}
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
              onChange={(e) => {
                setBidInfo({ ...bid_info, max_participants: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel required id='demo-simple-select-disabled-label'>
              {words_he['client_name']}
            </InputLabel>
            <Select
              required
              variant='standard'
              className={classes.select_element}
              value={bid_info.client_id}
              onChange={(e) => {
                setBidInfo({ ...bid_info, client_id: e.target.value })
              }}
            >
              {clients?.map((element) => (
                <MenuItem value={element.value} key={element.value}>
                  {element.label}
                </MenuItem>
              ))}
            </Select>
            <PersonAddOutlined onClick={handle_create_client} />
          </Grid>
          <Grid item xs={12}>
            <button className='btn btn-success m-4' onClick={handle_save_bid} disabled={!enable_send}>
              {words_he['save']}
            </button>
            <button type='button' className='btn btn-danger m-2' onClick={handle_cancel_and_exit}>
              {words_he['cancel_and_exit']}
            </button>
            <button className='btn btn-outline-dark m-2' onClick={handle_clear}>
              {words_he['clear_all']}
            </button>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

const languages = [
  { value: 'he', label: words_he['hebrew'] },
  { value: 'en', label: 'English' },
]
export default CreateBid
