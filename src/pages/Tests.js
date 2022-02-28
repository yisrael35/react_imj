import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'

const TestWebsocket = (props) => {
  // const dispatch = useDispatch()

  const test = async () => {}
  return (
    <div>
      {' '}
      <button className='w-45 btn m-2 btn-primary' onClick={test}>
        test
      </button>
    </div>
  )
  // return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default TestWebsocket
