import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './Auth/reducer'
import snackBarReduder from './SnackBar/reducer'
import userReduder from './User/reducer'
import bidReduder from './Bid/reducer'
import locationReduder from './Location/reducer'
import eventTypeReduder from './EventType/reducer'
import utilsReduder from './Utils/reducer'
import popUpReduder from './PopUp/reducer'

const initionState = {}
const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
  snackBar: snackBarReduder,
  user: userReduder,
  bid: bidReduder,
  location: locationReduder,
  eventType: eventTypeReduder,
  utils: utilsReduder,
  popUp: popUpReduder,
})

const store = createStore(rootReducer, initionState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
