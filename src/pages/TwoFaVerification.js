import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import EmailIcon from '@mui/icons-material/MarkunreadOutlined'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../redux/Auth/action'
import OtpInput from 'react-otp-input'

import Dictionary from '../utils/dictionary'
const TwoFaVerification = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  let phone = useSelector((state) => state.auth.phone)
  let email = useSelector((state) => state.auth.email)
  const dictionary = Dictionary()

  const [send_to, setSendTo] = useState('')
  const [six_digits, setSixDigits] = useState(0)
  const [loading_indicator_2FA, setLoadingIndicator2FA] = useState(false)

  if (isAuthenticated) {
    return <Redirect to={'/Home'} />
  }

  const handle_select_send = (chosen_way) => {
    setSendTo(chosen_way)
    dispatch(authActions.send_six_digits_to({ send_code_to: chosen_way }))
  }
  const handle_validate_six_digits = () => {
    setLoadingIndicator2FA(true)
    dispatch(authActions.validate_six_digits({ code: six_digits }))
    setTimeout(() => {
      setLoadingIndicator2FA(false)
    }, 4000)
  }

  const send_to_component = () => (
    <Grid container style={{ textAlign: 'center' }}>
      <Grid item xs={12} style={{ marginTop: 24 }}>
        <img alt='logo' src={`logo2.png`} width={70} height='auto' />
      </Grid>
      <Grid item xs={12} style={{ margin: 24 }}>
        <Typography variant='h4'>{dictionary['two_fa_title']}</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: 24, width: '70%' }}>
        <Typography variant='h5'>{dictionary['select_your_choice']}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handle_select_send('sms')} disabled={!phone}>
          <Grid container alignItems='center' spacing={5}>
            <Grid item xs={2}>
              <PhoneIphoneIcon sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={10}>
              <Typography>{`${dictionary['phone']}:`}</Typography>
              {phone ? <Typography style={{ direction: 'ltr' }}>{phone}</Typography> : <span></span>}
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handle_select_send('email')} disabled={!email}>
          <Grid container alignItems='center' spacing={5}>
            <Grid item xs={2}>
              <EmailIcon sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={10}>
              <Typography>{`${dictionary['email']}:`}</Typography>
              <Typography style={{ textTransform: 'none' }}>{email || ' example@mail.il'}</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={12} style={{ direction: 'rtl', color: 'black', textAlign: 'center', marginTop: '20px' }}>
        <Link
          to='Login'
          onClick={() => {
            dispatch(authActions.update_type(''))
          }}
        >
          <u style={{ color: 'black', textAlign: 'right' }}>{dictionary['go_back']}</u>
        </Link>
      </Grid>
    </Grid>
  )
  const validate_six_digits_component = () => (
    <Grid container style={{ textAlign: 'center', direction: 'ltr' }} alignItems='center' direction='column'>
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Typography variant='h4' style={{ margin: '20px', textAlign: 'center' }}>
          {dictionary['identity_verification']}
        </Typography>
        <Typography variant='h6' style={{ margin: '2px', direction: 'rtl' }}>
          <Typography>{dictionary['verification_message1']}</Typography>
          <Typography>
            {dictionary['to']} {send_to === 'email' ? email : phone ? <Typography style={{ direction: 'ltr', display: 'inline' }}>{phone}</Typography> : <span></span>}
          </Typography>
          <Typography>{dictionary['verification_message2']}</Typography>
          <Typography style={{ fontWeight: '600' }}>{dictionary['six_digits_verification']}</Typography>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OtpInput
          value={six_digits}
          onChange={(e) => setSixDigits(e)}
          autoFocus
          otpType='number'
          numInputs={6}
          separator={<span></span>}
          secure
          inputStyle={{
            fontFamily: 'monospace',
            borderRadius: '4px',
            margin: '15px',
            width: 41,
            height: 53,
            fontSize: 32,
            boxSizing: 'border-box',
            marginLeft: 0,
            color: `#0c85d6`,
            border: `1px solid black`,
            backgroundColor: 'white',
            marginTop: '20px',
            marginBottom: '40px',
          }}
        />
        <Grid item xs={12} style={{ direction: 'rtl', color: 'black', textAlign: 'right' }}>
          <u
            style={{ color: 'black', textAlign: 'right' }}
            onClick={() => {
              setSendTo('')
            }}
          >
            {dictionary['go_back']}
          </u>
        </Grid>

        {!loading_indicator_2FA ? (
          <Button
            style={{ color: `green`, border: `1px solid black` }}
            variant='outlined'
            onClick={() => handle_validate_six_digits()}
            disabled={six_digits < 100000}
            size='large'
            endIcon={<SendIcon />}
          >
            {dictionary['send']}
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  )

  return <Grid>{!send_to ? send_to_component() : validate_six_digits_component()}</Grid>
}

export default TwoFaVerification
