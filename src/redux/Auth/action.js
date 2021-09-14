import { LOGIN_SUCCESS } from './constants'
import axios from 'axios'

export const login = (username, password) => async (dispatch, getState) => {
  try {
		console.log({username,password});
    const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const content = await response.json()
		console.log(content);
    dispatch({ type: LOGIN_SUCCESS, payload: content })
  } catch (error) {
    console.log(error)
  }
}
