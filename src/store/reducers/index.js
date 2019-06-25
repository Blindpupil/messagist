import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

import authReducer from './authReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  firestore: firestoreReducer
})

export default rootReducer