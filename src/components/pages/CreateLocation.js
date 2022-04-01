import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import * as action_location from '../../redux/Location/action'
import * as action_utils from '../../redux/Utils/action'
import * as action_popUp from '../../redux/PopUp/action'

import { Box, Grid, TextField, Typography } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'
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

const CreateLocation = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [enable_send, setEnableSend] = useState(false)
  const [location_info, setLocationInfo] = useState({ name_en: '', name_he: '', mapping: '' })

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location_info])

  const validate_fields = () => {
    if (location_info.name_en || location_info.name_he || location_info.mapping) {
      return true
    }

    return false
  }

  const handle_save = () => {
    const data = location_info
    dispatch(action_location.create_location(data))
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
              {words_he['new_location']}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard'
            label={words_he['name_english']}
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setLocationInfo({ ...location_info, name_en: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard'
            label={words_he['name_hebrew']}
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setLocationInfo({ ...location_info, name_he: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard'
            label={words_he['mapping']}
            variant='standard'
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={(e) => setLocationInfo({ ...location_info, mapping: e.target.value })}
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

export default CreateLocation
