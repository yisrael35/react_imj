import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action_bid from '../../redux/Bid/action'
import EmailAndDownload from '../general/EmailAndDownload'
// const words_he = require('../../utils/words_he').words_he

const UpdateBid = (props) => {
  const dispatch = useDispatch()
  // const [bid_info, setBidInfo] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    const get_bid = async () => {
      const bid = await dispatch(action_bid.get_bid_by_id(props.id))
      // console.log(bid.bid)

      setEmail(bid.bid.client_email)
    }
    get_bid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <EmailAndDownload bid_id={props.id} email={email} message={'you can download a PDF file or send the client the bid'} />
    </div>
  )
}

export default UpdateBid

// client_name: "dsfa"
// comment: "dasasfsdfa"
// created_at: "2022-01-16T05:28:47.000Z"
// currency: "nis"
// event_date: "2022-01-16 12:00:00"
// event_name: "sadf"
// event_type: "פנימי"
// first_name: "yisrael - azriel"
// id: "2dc7366e-768d-11ec-85ad-005056c00001"
// last_name: "bar"
// location: "בתוך הבניין"
// max_participants: 2
// min_participants: 2
// status: "sent"
// total_a_discount: 86
// total_b_discount: 88
// total_discount: 2
// updated_at: "2022-01-16T05:28:47.000Z"
