import React, { useState } from 'react'

export default function TableRow({ index, schedule_time_event, schedule_time_event_array }) {
  const [start_time, setStartTime] = useState(schedule_time_event.start_time)
  const [end_time, setEndTime] = useState(schedule_time_event.end_time)
  const [activity_description, setActivityDescription] = useState(schedule_time_event.activity_description)

  const handle_start_time = (e) => {
    setStartTime(e)
    schedule_time_event_array[index].start_time = e
  }
  const handle_end_time = (e) => {
    setEndTime(e)
    schedule_time_event_array[index].end_time = e
  }
  const handle_activity_description = (e) => {
    setActivityDescription(e)
    schedule_time_event_array[index].activity_description = e
  }

  return (
    <tr>
      <td>
        <input
          type='time'
          value={start_time}
          onChange={(e) => {
            handle_start_time(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='time'
          value={end_time}
          onChange={(e) => {
            handle_end_time(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={activity_description}
          onChange={(e) => {
            handle_activity_description(e.target.value)
          }}
        />
      </td>
    </tr>
  )
}
