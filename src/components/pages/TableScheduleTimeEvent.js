import TableRow from './TableRowScheduleTimeEvent'
import { Grid } from '@mui/material/'

import Dictionary from '../../utils/dictionary'

export default function ScheduleTimeEvent({ schedule_time_event, setScheduleTimeEvent }) {
  const dictionary = Dictionary()

  const handle_add_row = () => {
    setScheduleTimeEvent([...schedule_time_event, { start_time: '', end_time: '', activity_description: '' }])
  }

  return (
    <Grid container>
      <Grid item xs={8} style={{ paddingBottom: '10px' }}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <h4 className='text-muted'> {dictionary['time_schedule_for_event']}</h4>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <table>
          <thead className='table_header'>
            <tr>
              <th> {dictionary['start_time']}</th>
              <th> {dictionary['end_time']}</th>
              <th> {dictionary['activity_description']}</th>
            </tr>
          </thead>
          <tbody>
            {schedule_time_event.map((element, index) => (
              <TableRow schedule_time_event={element} index={index} key={index} schedule_time_event_array={schedule_time_event} />
            ))}
          </tbody>
        </table>
        <Grid item xs={0.1}>
          <button type='button' className='btn btn-outline-dark' onClick={handle_add_row}>
            +
          </button>
        </Grid>
      </Grid>
    </Grid>
  )
}
