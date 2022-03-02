import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
// import { setNewEndDate, setNewStartDate } from '../../store/TradeBlotterSlice'

const MyDatePicker = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // const startDate = useSelector(state => state.tradeBlotter.startDate);
  // const endDate = useSelector(state => state.tradeBlotter.endDate);
  const [startDate, setFromDate] = useState(undefined)
  const [endDate, setToDate] = useState(undefined)

  const handleStartDateChange = (e) => {
    const { value } = e.target
    //dipatch
    setFromDate(value)
    // dispatch(setNewStartDate(value))
  }
  const handleEndDateChange = (e) => {
    const { value } = e.target
    //dipatch
    // dispatch()
    setToDate(value)
  }

  return (
    <>
      <form className={classes.container} noValidate>
        <span>From: </span>
        <TextField
          id='date'
          type='date'
          defaultValue={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartDateChange}
        />
        <span>To: </span>
        <TextField
          id='date'
          type='date'
          defaultValue={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEndDateChange}
        />
      </form>
    </>
  )
}

export default MyDatePicker

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))
