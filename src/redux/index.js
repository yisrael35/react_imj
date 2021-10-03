import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './Auth/reducer'
import snackBarReduder from './SnackBar/reducer'
import userReduder from './User/reducer'

const initionState = {}
const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
  snackBar: snackBarReduder,
  user: userReduder,
})

const store = createStore(rootReducer, initionState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
