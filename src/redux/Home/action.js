import { GET_EVENTS } from './constants'
import workerInstances from '../../services'

export const set_events = (response) => (dispatch) => {
  dispatch({ type: GET_EVENTS, payload: { events: response.events } })
}
export const get_events = (from_date, to_date, search) => (dispatch, getState) => {
  const store = getState()
  const token = store.auth.token
  const data = {
    type: 'get_events',
    data: {
      from_date,
      to_date,
      search,
    },
  }
  workerInstances.sendEvent(data, token)
}

//const my_event = {
//     title: 'Happy Hour',
//     start: '2022-02-13',
//     end: '2022-02-13',
//     desc: 'Power lunch happy hour',
//   },
//   {
//     title: 'Meeting',
//     bgColor: '#da70d6',
//     start: '2022-02-12',
//     end: '2022-02-12',
//   },
// ]
