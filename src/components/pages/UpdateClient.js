import React, { useState, useEffect } from 'react'
import '../../css/clients.css'
import { useDispatch } from 'react-redux'
import * as action_client from '../../redux/Client/action'
import * as action_popUp from '../../redux/PopUp/action'
import Select from '@material-ui/core/Select'
import * as actionSnackBar from '../../redux/SnackBar/action'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  email_input: {
    paddingRight: '4px',
    paddingLeft: '4px',
    marginRight: '18px',
    // margin: '10px',
  },
  input_padding: {
    marginRight: '18px',
    paddingLeft: '4px',
    paddingRight: '4px',
    margin: '4px',
  },
  title: {
    margin: '20px',
    fontSize: '30px',
  },
  action_buttons: {
    margin: '20px',
  },
}))

const { invalid_email, invalid_phone, all_fields_filled, invalid_email_characters } = require('../../utils/validate_helper')
const words_he = require('../../utils/words_he').words_he

const UpdateClient = (props) => {
  const classes = useStyles()

  const { name, type, email, phone } = props.client
  const [client_info, setClientInfo] = useState({ name, type, phone, email })
  const dispatch = useDispatch()
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
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['invalid_character']} ${client_info.email} `, 3000))
        return false
      }
      if (invalid_email(client_info.email)) {
        return false
      }
    }
    if (client_info.phone && invalid_phone(client_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${client_info.phone} `, 3000))
      return false
    }

    if (all_fields_filled(client_info)) {
      return true
    }
    return false
  }

  const convert_type = (type) => {
    switch (type) {
      case words_he['private']:
        return 'private'
      case words_he['company']:
        return 'company'
      case words_he['department']:
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
    dispatch(action_client.get_clients(limit, offset))
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const handle_delete = () => {
    dispatch(action_client.delete_client(props.client.uuid))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_client.get_clients(limit, offset))
    setClientInfo({ ...client_info })
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  const types = [
    { value: words_he['private'], label: words_he['private'] },
    { value: words_he['company'], label: words_he['company'] },
    { value: words_he['department'], label: words_he['department'] },
  ]

  return (
    <div>
      <Grid container>
        <Grid xs={12}>
          <Typography className={classes.title}>{words_he['update_client']}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent='center'>
            {' '}
            <Grid item xs={1}>
              {' '}
              <Typography>
                <b>{words_he['name']}</b>
              </Typography>{' '}
            </Grid>{' '}
            <Grid item xs={1}>
              {' '}
              <InputBase
                className={classes.input_padding}
                type='text'
                onChange={(e) => setClientInfo({ ...client_info, name: e.target.value })}
                defaultValue={client_info.name}
                style={{ borderStyle: 'solid', borderWidth: 1, borderRadius: 5, width: 180 }}
              />{' '}
            </Grid>{' '}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent='center'>
            {' '}
            <Grid item xs={1}>
              {' '}
              <Typography>
                <b>{words_he['type']}</b>
              </Typography>{' '}
            </Grid>{' '}
            <Grid item xs={1}>
              {' '}
              <Select
                className={classes.input_padding}
                value={client_info.type}
                label={words_he['type']}
                onChange={(e) => setClientInfo({ ...client_info, type: e.value })}
                style={{ borderStyle: 'solid', borderWidth: 1, borderRadius: 5, width: 180 }}
              >
                <MenuItem value={words_he['private']}>{words_he['private']}</MenuItem>
                <MenuItem value={words_he['company']}>{words_he['company']}</MenuItem>
                <MenuItem value={words_he['department']}>{words_he['department']}</MenuItem>
              </Select>{' '}
            </Grid>{' '}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent='center'>
            {' '}
            <Grid item xs={1}>
              {' '}
              <Typography>
                <b>{words_he['phone']}</b>
              </Typography>{' '}
            </Grid>{' '}
            <Grid item xs={1}>
              {' '}
              <InputBase
                className={classes.input_padding}
                type='tel'
                onChange={(e) => setClientInfo({ ...client_info, phone: e.target.value })}
                defaultValue={client_info.phone}
                style={{ borderStyle: 'solid', borderWidth: 1, borderRadius: 5, width: 180 }}
              />{' '}
            </Grid>{' '}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent='center'>
            {' '}
            <Grid item xs={1}>
              {' '}
              <Typography>
                <b>{words_he['email']}</b>
              </Typography>{' '}
            </Grid>{' '}
            <Grid item xs={1}>
              {' '}
              <InputBase
                type='email'
                onChange={(e) => setClientInfo({ ...client_info, email: e.target.value })}
                defaultValue={client_info.email}
                style={{ borderStyle: 'solid', borderWidth: 1, borderRadius: 5, width: 180 }}
                className={classes.email_input}
              />{' '}
            </Grid>{' '}
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.action_buttons}>
          <Grid container justifyContent='center'>
            <Grid item xs={1}>
              <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
                {words_he['save']}
              </button>
            </Grid>
            <Grid item xs={1}>
              <button type='button' className='btn btn-danger m-2' onClick={handle_delete}>
                {words_he['delete']}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default UpdateClient
