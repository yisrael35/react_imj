import { GET_HOME_EVENTS, SAVE_DATE } from './constants'
import workerInstances from '../../services'
import moment from 'moment'

export const set_events = (response) => (dispatch) => {
  for (const event of response.events ) {
    event.start = moment(event.start).toDate() 
    event.end = moment(event.end).toDate() 
  }
  dispatch({ type: GET_HOME_EVENTS, payload: { events: response.events } })
}
export const save_date = (last_date) => (dispatch) => {
  dispatch({ type: SAVE_DATE, payload: { last_date } })
}
export const get_events =
  ({ from_date, to_date, search }) =>
  (dispatch) => {
    const data = {
      type: 'get_events',
      data: {
        from_date,
        to_date,
        search,
        status:'approved'
      },
    }
    workerInstances.send_message(data)
  }
