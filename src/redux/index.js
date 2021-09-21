import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './Auth/reducer'
import snackBarReduder from './SnackBar/reducer'

const initionState = {}
const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
  snackBar: snackBarReduder,
})

const store = createStore(rootReducer, initionState, composeWithDevTools(applyMiddleware(...middleware)))
// const store = createStore(rootReducer, initionState, applyMiddleware(...middleware))

export default store
