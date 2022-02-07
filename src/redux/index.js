import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './Auth/reducer'
import clientReducer from './Client/reducer'
import snackBarReducer from './SnackBar/reducer'
import userReducer from './User/reducer'
import bidReducer from './Bid/reducer'
import locationReducer from './Location/reducer'
import eventTypeReducer from './EventType/reducer'
import utilsReducer from './Utils/reducer'
import popUpReducer from './PopUp/reducer'
import homeReducer from './Home/reducer'
import eventReducer from './Event/reducer'
import supplierReducer from './Supplier/reducer'

const initionState = {}
const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
  snackBar: snackBarReducer,
  user: userReducer,
  bid: bidReducer,
  location: locationReducer,
  eventType: eventTypeReducer,
  utils: utilsReducer,
  popUp: popUpReducer,
  client: clientReducer,
  home: homeReducer,
  event: eventReducer,
  supplier: supplierReducer,
})

const store = createStore(rootReducer, initionState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
