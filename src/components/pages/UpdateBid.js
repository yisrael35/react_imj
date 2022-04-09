import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action_bid from '../../redux/Bid/action'
import EmailAndDownload from '../general/EmailAndDownload'
const words_he = require('../../utils/words_he').words_he

const UpdateBid = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState()

  useEffect(() => {
    const get_bid = async () => {
      const bid = await dispatch(action_bid.get_bid_by_id(props.id))
      setEmail(bid.bid.client_email)
    }
    get_bid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <EmailAndDownload bid_id={props.id} email={email} message={words_he['download_pdf_title']} />
    </div>
  )
}

export default UpdateBid
