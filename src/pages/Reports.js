import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action_utils from '../redux/Utils/action'
import * as action_loading from '../redux/Loading/action'
import * as action_csv from '../redux/CSV/action'
import Select from 'react-select'
import RangeDatePicker from '../components/general/RangeDatePicker'
import { FaFileCsv } from 'react-icons/fa'

const words_he = require('../utils/words_he').words_he

const Reports = (props) => {
  const dispatch = useDispatch()
  const [from_date, setFromDate] = useState(undefined)
  const [to_date, setToDate] = useState(undefined)

  useEffect(() => {
    dispatch(action_utils.get_utils())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [table, setTable] = useState(undefined)

  const tables = useSelector((state) => state.utils.tables)
  const file_name = useSelector((state) => state.csv.file_name)
  const create_csv = async () => {
    dispatch(action_csv.get_table({ from_date, to_date, table }))
    dispatch(action_loading.setLoading())
  }

  return (
    <div style={{ lineHeight: '2', verticalAlign: 'middle', textAlign: 'center' }}>
      <h4>{words_he['reports']}</h4>
      <FaFileCsv style={{ fontSize: '100px', margin: '20px' }} />

      <RangeDatePicker from_date={from_date} setFromDate={setFromDate} to_date={to_date} setToDate={setToDate} />
      <Select
        className={'report_select'}
        placeholder={'tables'}
        options={tables}
        id='tables'
        label={'tables'}
        onChange={(e) => {
          setTable(e.value)
        }}
      />
      <button className='w-45 m-4 btn btn-success' onClick={create_csv} disabled={file_name || !table}>
        {words_he['create_csv']}
      </button>
    </div>
  )
  // return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default Reports
