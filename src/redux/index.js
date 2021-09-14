import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import authReducer from './Auth/reducer';

const initionState = {}
const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(rootReducer,initionState,composeWithDevTools(applyMiddleware(...middleware)));
// const store = createStore(rootReducer, initionState, applyMiddleware(...middleware))

export default store
