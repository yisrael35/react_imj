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
import clientReducer from './Client/reducer'
import snackBarReducer from './SnackBar/reducer'
import userReducer from './User/reducer'
import bidReducer from './Bid/reducer'
import locationReducer from './Location/reducer'
import eventTypeReducer from './EventType/reducer'
import utilsReducer from './Utils/reducer'
import popUpReducer from './PopUp/reducer'
import homeReducer from './Home/reducer'

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
  client: clientReducer,
  popUp: popUpReducer,
  home: homeReducer,
})

const store = createStore(rootReducer, initionState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
