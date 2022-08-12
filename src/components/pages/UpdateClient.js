import React, { useState, useEffect } from 'react'
import '../../css/clients.css'

import { useDispatch } from 'react-redux'
import * as action_client from '../../redux/Client/action'
import * as action_popUp from '../../redux/PopUp/action'
import * as actionSnackBar from '../../redux/SnackBar/action'

import { InputLabel, MenuItem, Select, Box, Grid, TextField, Typography } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'

import Dictionary from '../../utils/dictionary'
const { validateEmail, invalid_phone, all_fields_filled, invalid_email_characters } = require('../../utils/validate_helper')

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

const UpdateClient = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const dictionary = Dictionary()

  const { name, type, email, phone } = props.client
  const [client_info, setClientInfo] = useState({ name, type, phone, email })
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client_info])

  const validate_fields = () => {
    if (client_info.email) {
      if (invalid_email_characters(client_info.email)) {
        dispatch(actionSnackBar.setSnackBar('error', `${dictionary['invalid_character']} ${client_info.email} `, 3000))
        return false
      }
      if (!validateEmail(client_info.email)) {
        return false
      }
    }
    if (client_info.phone && invalid_phone(client_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${dictionary['type_number']} ${client_info.phone} `, 3000))
      return false
    }

    if (all_fields_filled(client_info)) {
      return true
    }
    return false
  }

  const convert_type = (type) => {
    switch (type) {
      case dictionary['private']:
        return 'private'
      case dictionary['company']:
        return 'company'
      case dictionary['department']:
        return 'department'
      default:
        break
    }
  }

  const get_data = (client_info) => {
    let data = {}
    for (let key in client_info) {
      if (client_info[key] != null) {
        data[key] = client_info[key]
      }
    }
    return { ...data, type: convert_type(data.type) }
  }

  const handle_save = () => {
    const data = get_data(client_info)
    dispatch(action_client.update_client(data, props.client.uuid))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_client.get_clients({ limit, offset }))
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const handle_delete = () => {
    dispatch(action_client.delete_client(props.client.uuid))
    const limit = props.limit
    const offset = props.offset
    setTimeout(() => {
      dispatch(action_client.get_clients({ limit, offset }))
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
              {dictionary['update_client']}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            inputProps={{ style: { textAlign: 'center' } }}
            id='standard-required'
            label={' * ' + dictionary['name']}
            value={client_info.name}
            variant='standard'
            onChange={(e) => setClientInfo({ ...client_info, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          <InputLabel className={classes.title_type} style={{ fontSize: 'small' }}>
            {' * ' + dictionary['type']}
          </InputLabel>

          <Select
            variant='standard'
            required
            id='type'
            className={classes.select_element}
            value={client_info.type}
            onChange={(e) => {
              setClientInfo({ ...client_info, type: e.target.value })
            }}
          >
            <MenuItem value={dictionary['private']}>{dictionary['private']}</MenuItem>
            <MenuItem value={dictionary['company']}>{dictionary['company']}</MenuItem>
            <MenuItem value={dictionary['department']}>{dictionary['department']}</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            type='tel'
            id='standard-required'
            label={dictionary['phone']}
            value={client_info.phone || ''}
            inputProps={{ style: { textAlign: 'center' } }}
            variant='standard'
            onChange={(e) => setClientInfo({ ...client_info, phone: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            type='email'
            id='standard-required'
            label={dictionary['email']}
            value={client_info.email}
            inputProps={{ style: { textAlign: 'center' } }}
            variant='standard'
            direction='ltr'
            onChange={(e) => setClientInfo({ ...client_info, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container justifyContent='center'>
            <Grid item>
              <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
                {dictionary['save']}
              </button>
            </Grid>
            <Grid item>
              <button type='button' className='btn btn-danger m-2' onClick={handle_delete}>
                {dictionary['delete']}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UpdateClient
