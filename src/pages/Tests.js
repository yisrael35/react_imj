import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import TableScheduleTimeEvent from '../components/pages/TableScheduleTimeEvent'
const words_he = require('../utils/words_he').words_he

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
  },
  ScheduleTimeEvent: {
    // textAlign: 'center',
    // margin: theme.spacing(2),
    // margin: 'auto',
  },
  table: {
    margin: 'auto',
    padding: theme.spacing(10),
  },
}))
const Test = () => {
  const [bid_id, setBidId] = useState('81490f6d-97e0-11ec-94d1-005056c00001')

  const [schedule_time_event, setScheduleTimeEvent] = useState([{ start_time: '', end_time: '', activity_description: '' }])
  const classes = useStyles()

  return (
    <div>
      <Grid className={classes.ScheduleTimeEvent}>
        <Grid container>
          <Grid item xs={12}>
            <span>
              <h3>{words_he['bid_created']}</h3>
            </span>
            {`${words_he['bid_id']}: ${bid_id}`}
          </Grid>
          <Grid item className={classes.table}>
            <TableScheduleTimeEvent setScheduleTimeEvent={setScheduleTimeEvent} schedule_time_event={schedule_time_event} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Test
