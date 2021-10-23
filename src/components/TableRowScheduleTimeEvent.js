import React, { useState } from 'react'

export default function TableRow({ index, schedule_time_event, schedule_time_event_array }) {
  const [from, setFrom] = useState(schedule_time_event.from)
  const [to, setTo] = useState(schedule_time_event.to)
  const [describe, setDescribe] = useState(schedule_time_event.describe)

  const handle_from = (e) => {
    setFrom(e)
    schedule_time_event_array[index].from = e
  }
  const handle_to = (e) => {
    setTo(e)
    schedule_time_event_array[index].to = e
  }
  const handle_describe = (e) => {
    setDescribe(e)
    schedule_time_event_array[index].describe = e
  }

  return (
    <tr>
      <td>
        <input
          type='text'
          value={from}
          onChange={(e) => {
            handle_from(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={to}
          onChange={(e) => {
            handle_to(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={describe}
          onChange={(e) => {
            handle_describe(e.target.value)
          }}
        />
      </td>
    </tr>
  )
}
