import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action_utils from '../redux/Utils/action'
import * as action_csv from '../redux/CSV/action'
import Select from 'react-select'

const Reports = (props) => {
  const dispatch = useDispatch()
  //TODO
  // const [from_date, setFromDate] = useState(undefined)
  // const [to_date, setToDate] = useState(undefined)
  let from_date, to_date
  
  useEffect(() => {
    dispatch(action_utils.get_utils())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [table, setTable] = useState(undefined)

  const tables = useSelector((state) => state.utils.tables)
  const file_name = useSelector((state) => state.csv.file_name)
  const create_csv = async () => {
    dispatch(action_csv.get_table({ from_date, to_date, table }))
  }
  const delete_file = async () => {
    dispatch(action_csv.delete_file(file_name))
  }
  const url = process.env.REACT_APP_REST_IMJ_URL
  const file_path = `${url}/assets/${file_name}`

  return (
    <div>
      {' '}
      <Select
        className={'select'}
        placeholder={'tables'}
        options={tables}
        id='tables'
        label={'tables'}
        onChange={(e) => {
          setTable(e.value)
        }}
      />
      <button className='w-45 btn m-2 btn-primary' onClick={create_csv} disabled={file_name || !table}>
        create csv
      </button>
      <a href={file_path}>
        <button className='w-45 btn m-2 btn-primary' disabled={!file_name} onClick={delete_file}>
          download file
        </button>
      </a>
    </div>
  )
  // return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default Reports
