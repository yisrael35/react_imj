import { GET_HOME_EVENTS, SAVE_DATE } from './constants'
import workerInstances from '../../services'

export const set_events = (response) => (dispatch) => {
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
      },
    }
    workerInstances.send_message(data)
  }
