import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyDatePicker from '../components/general/DatePicker'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

import moment from 'moment'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import * as action_utils from '../redux/Utils/action'
import * as action_popUp from '../redux/PopUp/action'
import CreateClient from '../components/pages/CreateClient'
import CancelExit from '../components/general/CancelExit'

const words_he = require('../utils/words_he').words_he

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  event_date: {
    margin: '10px',
  },
  event_name: {
    margin: '10px',
    height: '45px',
    paddingRight: '8px',
    borderRadius: '3px',
  },
  participants_amount: {
    margin: '14px',
    position: 'relative',
    width: '20%',
  },
  textarea: {
    position: 'relative',
    left: '2%',
    margin: '10px',
    padding: '2px',
    display: 'inline-block',
    marginTop: '14px',
    borderRadius: '3px',
  },
  select_language: {
    float: 'left',
    position: 'relative',
    width: '10%',
    marginLeft: '2%',
  },
  select_event_type: {
    width: '20%',
    display: 'inline-block',
    marginRight: '1%',
  },
  select_location: {
    position: 'relative',
    marginTop: '8px',
    marginBottom: '8px',
    width: '20%',
    display: 'inline-block',
  },
  select_clients: {
    width: '20%',
    display: 'inline-block',
    marginRight: '3%',
  },
  title: {
    fontSize: '180%',
    marginBottom: '18px',
  },
  margin: {
    margin: theme.spacing(1),
  },
  button_client: {
    // position: 'relative',
    // right: '85px',
    // bottom: '35px',
    // display: 'inline',
    // background: '#D0D0D0',
    // paddingTop: '5px',
    // paddingRight: '5px',
    // paddingLeft: '5px',
  },
}))
const CreateBid = ({ handle_save_bid }) => {
  const dispatch = useDispatch()
  const [bid_info, setBidInfo] = useState({
    event_type: undefined,
    location: undefined,
    user: 1,
    event_date: undefined,
    event_comment: undefined,
    client_id: undefined,
    event_name: undefined,
    max_participants: undefined,
    language: 'he',
  })
  const [date, setDate] = useState(moment().format(`YYYY-MM-DD`))
  const [enable_send, setEnableSend] = useState(false)
  const classes = useStyles()
  const locations = useSelector((state) => state.utils.locations)
  const clients = useSelector((state) => state.utils.clients)
  const events_type = useSelector((state) => state.utils.events_type)

  useEffect(() => {
    setBidInfo({ ...bid_info, event_date: date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

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
  }, [bid_info, date])

  const validate_fields = () => {
    //TODO
    if (bid_info.event_type && bid_info.location && bid_info.user && bid_info.event_date && bid_info.event_comment && bid_info.client_id && bid_info.event_name && bid_info.max_participants) {
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
      event_type: undefined,
      location: undefined,
      event_date: undefined,
      event_comment: undefined,
      client_id: undefined,
      event_name: undefined,
      max_participants: undefined,
      language: 'he',
    })
  }
  // console.log(bid_info);
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.title}>{words_he['new_bid']}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Select
          className={classes.select_language}
          placeholder={words_he['hebrew']}
          options={languages}
          id='languages'
          label={words_he['languages']}
          onChange={(e) => {
            setBidInfo({ ...bid_info, language: e.value })
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <label>
          {words_he['event_name']}
          <input
            // placeholder={words_he['event_name']}
            className={classes.event_name}
            type='text'
            name='event_Name'
            onChange={(e) => {
              setBidInfo({ ...bid_info, event_name: e.target.value })
            }}
          />
        </label>
      </Grid>
      <Grid item xs={3}>
        {words_he['event_date']}
        <label className={classes.event_date}>
          <MyDatePicker date={date} setDate={setDate} />
        </label>
      </Grid>
      <Grid xs={6}>
        <Select
          className={classes.select_event_type}
          placeholder={words_he['event_type']}
          options={events_type}
          id='event_type'
          label='event type'
          onChange={(e) => {
            setBidInfo({ ...bid_info, event_type: e.value })
          }}
        />
      </Grid>
      <Grid xs={4}>
        <textarea
          className={classes.textarea}
          placeholder={words_he['comments']}
          onChange={(e) => {
            setBidInfo({ ...bid_info, event_comment: e.target.value })
          }}
        />
      </Grid>
      <Grid xs={6}>
        <Select
          className={classes.select_location}
          placeholder={words_he['location']}
          options={locations}
          id='location'
          label='location'
          onChange={(e) => {
            setBidInfo({ ...bid_info, location: e.value })
          }}
        />
      </Grid>
      <Grid xs={4}>
        <label>
          {words_he['participants_amount']}
          <input
            className={classes.participants_amount}
            min='0'
            type='number'
            // placeholder={words_he['participants_amount']}
            onChange={(e) => {
              setBidInfo({ ...bid_info, max_participants: e.target.value })
            }}
          />
        </label>
      </Grid>
      <Grid xs={6}>
        <Select
          placeholder={words_he['client_name']}
          options={clients}
          className={classes.select_clients}
          id='clients'
          label={words_he['clients']}
          onChange={(e) => {
            setBidInfo({ ...bid_info, client_id: e.value })
          }}
        />{' '}
        <button className={classes.button_client} onClick={handle_create_client}>
          <AddCircleOutline />
          {/* TODO  */}
          {/* {'+'} */}
        </button>
      </Grid>
      {/*
      <Grid>
        <button className='btn btn-success m-4' onClick={handle_save_bid} disabled={!enable_send}>
          {words_he['save']}
        </button>
        <button type='button' className='btn btn-danger m-2' onClick={handle_cancel_and_exit}>
          {words_he['cancel_and_exit']}
        </button>
        <button type='button' className='btn btn-outline-dark m-2' onClick={handle_clear}>
          {words_he['clear_all']}
        </button>
      </Grid> */}
    </Grid>
  )
}

export default CreateBid

const languages = [
  { value: 'he', label: words_he['hebrew'] },
  { value: 'en', label: 'English' },
]
