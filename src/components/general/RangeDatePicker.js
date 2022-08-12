import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import Dictionary from '../../utils/dictionary'

const MyDatePicker = ({ from_date, setFromDate, to_date, setToDate }) => {
  const classes = useStyles()
  const [end_after_start, setEndAfterStart] = useState(true)

  const dictionary = Dictionary()

  const handle_start_date = (date) => {
    if (!to_date || moment(to_date).isAfter(date)) {
      setEndAfterStart(true)
      setFromDate(date)
    } else {
      setEndAfterStart(false)
    }
  }
  const handle_end_date = (date) => {
    if (moment(date).isAfter(from_date)) {
      setEndAfterStart(true)
      setToDate(date)
    } else {
      setEndAfterStart(false)
    }
  }
  return (
    <form className={classes.container} noValidate>
      <span>{dictionary['from_date']} </span>
      <TextField
        id='date'
        type='date'
        defaultValue={from_date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handle_start_date(e.target.value)}
      />
      <span className={classes.to_date}>{dictionary['to_date']} </span>
      <TextField
        id='date'
        type='date'
        defaultValue={to_date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handle_end_date(e.target.value)}
      />
      {!end_after_start && <span style={{ color: 'red' }}> {dictionary['end_date_after_start']}</span>}
    </form>
  )
}

export default MyDatePicker

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '24px',
  },
  to_date: {
    marginRight: theme.spacing(5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))
