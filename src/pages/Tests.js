import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import workerInstances from '../services'
import * as actionSnackBar from '../redux/SnackBar/action'

const TestWebsocket = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const receiveData = (message) => {
      // console.log(message)
      if (message?.data?.content) {
        const response = { ...message.data }
        console.log(response)
        dispatch(actionSnackBar.setSnackBar('success', response.content, 2000))
      }
    }
    workerInstances.addEventListener('message', receiveData)
    return () => {
      workerInstances.removeEventListener('message', receiveData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const test_websocket = async () => {
    const data = {
      type:'init-connection',
    }
    workerInstances.connectWS(token)
    workerInstances.sendEvent(data, token)
    console.log('test_websocket', data)
  }
  return (
    <div>
      {' '}
      <button className='w-45 btn m-2 btn-primary' onClick={test_websocket}>
        test_websocket
      </button>
    </div>
  )
  // return <div style={{ textAlign: 'center' }}>{user ? user.first_name : `didn't load user`}</div>
}

export default TestWebsocket
