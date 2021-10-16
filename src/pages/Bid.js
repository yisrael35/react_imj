import React, { useState } from 'react'
// import CustomDropdown from '../components/CustomDropdown'
// import '../css/bid.css'
// import { useDispatch } from 'react-redux'
// import * as action_bid from '../redux/Bid/action'
const words_he = require('../utils/words_he').words_he



const Bid = (props) => {
  let data = {}
  // const dispatch = useDispatch()
  // dispatch(action_bid.create_new_bid(data))
  const [startDate, setStartDate] = useState(new Date())
  data = { date: startDate }
  console.log(data)
  return (
    <div>
      <title> {words_he['new_bid']}</title>
      <p>bid id: 5353526</p>
      <input type='Date' placeholder='Search...' onChange={(e) => setStartDate(e.target.value)} />
      {/* <select required>
        <option value='num1'>זנזיבר </option>
        <option value='num2'>ספרד </option>
        <option value='num3' selected>
          ברזיל
        </option>
      </select> */}
      {/* <CustomDropdown
        label={value.name.toUpperCase()}
        name={value.name}
        value={stateInputs[value.name]}
        error={stateInputs[value.name] === undefined || stateInputs[value.name] === ''}
        options={optionOnBehalf}
        onChange={(e, data) => {
          handleOnChangeInputs(e, data)
        }}
      /> */}
    </div>
  )
}

export default Bid
