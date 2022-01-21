import { GET_EVENTS } from './constants'
import workerInstances from '../../services'

export const set_events = (response) => (dispatch) => {
  dispatch({ type: GET_EVENTS, payload: { events: response.events } })
}
export const get_events = (from_date, to_date, search) => (dispatch) => {
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
