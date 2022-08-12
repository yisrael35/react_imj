import React, { useEffect, useState } from 'react'
import { FaFileCsv } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import * as action_utils from '../redux/Utils/action'
import * as action_loading from '../redux/Loading/action'
import * as action_csv from '../redux/CSV/action'
import * as action_popUp from '../redux/PopUp/action'

import RangeDatePicker from '../components/general/RangeDatePicker'
import { makeStyles } from '@material-ui/core/styles'
import { MenuItem, Select, Grid, InputLabel } from '@mui/material/'

import Dictionary from '../utils/dictionary'

const useStyles = makeStyles((theme) => ({
  textStyle: {
    'font-weight': 'normal',
    color: 'grey',
  },
  rtl: {
    display: 'inline-block',
    'text-align': 'right',
  },
}))

const Reports = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const dictionary = Dictionary()
  const tables = useSelector((state) => state.utils.tables)
  const file_name = useSelector((state) => state.csv.file_name)

  const [from_date, setFromDate] = useState(undefined)
  const [to_date, setToDate] = useState(undefined)
  const [table, setTable] = useState('')

  useEffect(() => {
    dispatch(action_utils.get_utils())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const create_csv = async () => {
    dispatch(action_popUp.disablePopUp())
    dispatch(action_loading.setLoading())
    dispatch(action_csv.get_table({ from_date, to_date, table }))
  }

  return (
    <div style={{ lineHeight: '2', verticalAlign: 'middle', textAlign: 'center' }}>
      <h4>{dictionary['reports']}</h4>
      <FaFileCsv style={{ fontSize: '100px', margin: '20px' }} />
      <h6 className={classes.textStyle}>
        {dictionary['reports_content_row1']}
        <br />
        {dictionary['reports_content_row2']}
        <br />
        <span className={classes.rtl}>
          {dictionary['reports_content_row3']}
          <br />
          {dictionary['reports_content_row4']}
          <br />
          {dictionary['reports_content_row5']}
        </span>
      </h6>
      <RangeDatePicker from_date={from_date} setFromDate={setFromDate} to_date={to_date} setToDate={setToDate} />
      <Grid>
        <InputLabel required id='demo-simple-select-disabled-label'>
          {dictionary['tables']}
        </InputLabel>
        <Select
          value={table}
          variant='standard'
          className={'report_select'}
          id='standard-required'
          label={dictionary['tables']}
          onChange={(e) => {
            setTable(e.target.value)
          }}
        >
          {tables.map((element) => (
            <MenuItem value={element.value} key={element.value}>
              {element.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <button className='w-45 m-4 btn btn-success' onClick={create_csv} disabled={file_name || !table}>
        {dictionary['create_csv']}
      </button>
    </div>
  )
}

export default Reports
