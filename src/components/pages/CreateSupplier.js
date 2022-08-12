import React, { useState, useEffect } from 'react'
import '../../css/suppliers.css'

import { useDispatch } from 'react-redux'
import * as action_supplier from '../../redux/Supplier/action'
import * as action_popUp from '../../redux/PopUp/action'
import * as actionSnackBar from '../../redux/SnackBar/action'

import { Box, Grid, TextField, Typography } from '@mui/material/'
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
}))

const CreateSupplier = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const dictionary = Dictionary()

  const [supplier_info, setSupplierInfo] = useState({ name: '', account: { account_name: '', iban: '', swift: '' }, phone: '', email: '' })
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
        dispatch(actionSnackBar.setSnackBar('error', `${dictionary['invalid_character']} ${supplier_info.email} `, 3000))
        return false
      }
      if (!validateEmail(supplier_info.email)) {
        return false
      }
    }
    if (supplier_info.phone && invalid_phone(supplier_info.phone)) {
      dispatch(actionSnackBar.setSnackBar('error', `${dictionary['type_number']} ${supplier_info.phone} `, 3000))
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
              {dictionary['new_supplier']}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            id='standard-required'
            inputProps={{ style: { textAlign: 'center' } }}
            label={' * ' + dictionary['name']}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            type='tel'
            inputProps={{ style: { textAlign: 'center' } }}
            id='standard-required'
            label={dictionary['phone']}
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
            inputProps={{ style: { textAlign: 'center' } }}
            label={dictionary['email']}
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
            inputProps={{ style: { textAlign: 'center' } }}
            label={dictionary['account_name']}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, account_name: e.target.value } })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.ltr_input}
            required
            inputProps={{ style: { textAlign: 'center' } }}
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
            inputProps={{ style: { textAlign: 'center' } }}
            id='standard-required'
            label={'SWIFT'}
            variant='standard'
            onChange={(e) => setSupplierInfo({ ...supplier_info, account: { ...supplier_info.account, swift: e.target.value } })}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container justifyContent='center'>
            <Grid item>
              <button type='button' className='btn btn-success m-2' onClick={handle_save} disabled={!enable_send}>
                {dictionary['save']}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateSupplier
