import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import authReducer from './authReducer'
import messageReducer from './messageReducer'

/**
 * The rootReducer exported here contains firestoreReducer and firebaseReducer
 * which handle the state for us regarding changes in firestore (the db) 
 * and firebase (authentication services) 
 */
const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer