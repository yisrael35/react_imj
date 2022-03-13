import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // border: '1px solid',
    // borderRadius: '4px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

export default function MyDatePicker({ date, setDate, label }) {
  const classes = useStyles()

  return (
    <form className={classes.container} noValidate>
      <TextField
        id='date'
        label={label ? label : 'Date'}
        type='date'
        defaultValue={date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: date,
        }}
        onChange={(e) => {
          setDate(e.target.value)
        }}
      />
    </form>
  )
}
