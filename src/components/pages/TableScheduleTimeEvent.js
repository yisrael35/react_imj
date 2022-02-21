import TableRow from './TableRowScheduleTimeEvent'
const words_he = require('../../utils/words_he').words_he

export default function ScheduleTimeEvent({ schedule_time_event, setScheduleTimeEvent }) {
  const handle_add_row = () => {
    setScheduleTimeEvent([...schedule_time_event, { start_time: '', end_time: '', activity_description: '' }])
  }

  return (
    <div>
      {words_he['time_schedule_for_event']}
      <table>
        <thead className='table_header'>
          <tr>
            <th>  {words_he['start_time']}</th>
            <th>  {words_he['end_time']}</th>
            <th>  {words_he['activity_description']}</th>
          </tr>
        </thead>
        <tbody>
          {schedule_time_event.map((element, index) => (
            <TableRow schedule_time_event={element} index={index} key={index} schedule_time_event_array={schedule_time_event} />
          ))}
        </tbody>
      </table>
      <button type='button' className='btn btn-outline-dark' onClick={handle_add_row}>
        +
      </button>
    </div>
  )
}
