import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import * as action_event_type from '../../redux/EventType/action'
import * as action_utils from '../../redux/Utils/action'
import * as action_popUp from '../../redux/PopUp/action'

import { Box, Grid, TextField, Typography } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'
const { all_fields_filled } = require('../../utils/validate_helper')

const words_he = require('../../utils/words_he').words_he

const useStyles = makeStyles((theme) => ({
  ltr_input: {
    width: '20%',
    padding: '0px',
    direction: 'ltr',
  },
  textField: {
    width: '20%',
    padding: '0px',
  },

  select_element: {
    width: '220px',
    padding: '0px',
  },
  title_type: {
    textAlign: 'center',
  },
}))

const CreateEventType = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [enable_send, setEnableSend] = useState(false)
  const [event_type_info, setEventTypeInfo] = useState({ name: '', language: '' })

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_type_info])

  const validate_fields = () => {
    // if (location_info.name_en || location_info.name_he || location_info.mapping) {
    //   return true
    // }
    if (all_fields_filled(event_type_info)) {
      return true
    }

    return false
  }

  const handle_save = () => {
    const data = event_type_info
    dispatch(action_event_type.create_event_type(data))
    dispatch(action_utils.get_utils())
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
              {words_he['new_event_type']}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard-required'
            label={' * ' + words_he['name']}
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setEventTypeInfo({ ...event_type_info, name: e.target.value })}
          />
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

export default CreateEventType
