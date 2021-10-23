import TableRow from './TableRowScheduleTimeEvent'

export default function ScheduleTimeEvent({ schedule_time_event, setScheduleTimeEvent }) {
  const handle_add_row = () => {
    setScheduleTimeEvent([...schedule_time_event, { from: '', to: '', describe: '' }])
  }

  return (
    <div>
      schedule event time:
      <table>
        <thead>
          <tr>
            <th>from</th>
            <th>to</th>
            <th>describe the activty</th>
          </tr>
        </thead>
        <tbody>
          {schedule_time_event.map((element, index) => (
            <TableRow schedule_time_event={element} index={index} key={index} schedule_time_event_array={schedule_time_event} />
          ))}
        </tbody>
      </table>
      <button type='button' className='btn btn-info' onClick={handle_add_row}>
        +
      </button>
    </div>
  )
}
