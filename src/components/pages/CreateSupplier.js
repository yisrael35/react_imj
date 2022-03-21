import React, { useState, useEffect } from 'react'
import '../../css/suppliers.css'
import { useDispatch } from 'react-redux'
import * as action_supplier from '../../redux/Supplier/action'
import * as action_popUp from '../../redux/PopUp/action'
import * as actionSnackBar from '../../redux/SnackBar/action'
import { Box, Grid, TextField, Typography } from '@mui/material/'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  ltr_input: {
    right: '2%',
    width: '20%',
    padding: '1%',
    direction: 'ltr',
  },
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
const { invalid_email, invalid_phone, all_fields_filled, invalid_email_characters } = require('../../utils/validate_helper')

const CreateSupplier = (props) => {
  const classes = useStyles()

  const [supplier_info, setSupplierInfo] = useState({ name: '', account: { account_name: '', iban: '', swift: '' }, phone: '', email: '' })
  const dispatch = useDispatch()
  const [enable_send, setEnableSend] = useState(false)

  useEffect(() => {
    if (validate_fields()) {
      setEnableSend(true)
    } else {
      setEnableSend(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier_info])

  const validate_fields = () => {
    if (supplier_info.email) {
      if (invalid_email_characters(supplier_info.email)) {
        dispatch(actionSnackBar.setSnackBar('error', `${words_he['invalid_character']} ${supplier_info.email} `, 3000))
        return false
      }
      if (invalid_email(supplier_info.email)) {
        return false
      }
    }
    if (supplier_info.phone && invalid_phone(supplier_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${words_he['type_number']} ${supplier_info.phone} `, 3000))
      return false
    }

    if (all_fields_filled(supplier_info)) {
      return true
    }
    return false
  }

  const handle_save = () => {
    dispatch(action_supplier.create_supplier(supplier_info))
    const limit = props.limit
    const offset = props.offset
    dispatch(action_supplier.get_suppliers({ limit, offset }))
    setTimeout(() => {
      dispatch(action_popUp.disablePopUp())
    }, 1000)
  }

  let account_name
  let iban
  let swift
  if (!supplier_info.account) {
    account_name = ''
    iban = ''
    swift = ''
  } else {
    account_name = supplier_info.account.account_name
    iban = supplier_info.account.iban
    swift = supplier_info.account.swift
  }

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
              {words_he['new_supplier']}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard-required'
            label={' * ' + words_he['name']}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            type='tel'
            id='standard-required'
            label={words_he['phone']}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, phone: e.target.value })}
          />
        </Grid>

        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            type='email'
            id='standard-required'
            label={words_he['email']}
            variant='standard'
            direction='ltr'
            onChange={(e) => setSupplierInfo({ ...supplier_info, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            id='standard-required'
            label={words_he['account_name']}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, account_name: e.target.value } })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            id='standard-required'
            label={'IBAN'}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, iban: e.target.value } })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            id='standard-required'
            label={'SWIFT'}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, swift: e.target.value } })}
          />
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

export default CreateSupplier
