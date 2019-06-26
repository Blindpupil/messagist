import React from 'react'
import ReactDOM from 'react-dom'
import {
  createStore, 
  applyMiddleware,
  compose
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { 
  reduxFirestore, 
  createFirestoreInstance, 
  getFirestore 
} from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import firebase from './firebase'
// import fbConfig from './firebase/config'
import App from './App'
import * as serviceWorker from './serviceWorker'
import rootReducer from './store/reducers'


// ======================================================
// Middleware Configuration
// ======================================================
const middleware = [
  thunk.withExtraArgument({ getFirestore }),
  // This is where you add other middleware like observable or whatever
];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed for firestore
}

ReactDOM.render(
  <Provider store={ store }>
    <ReactReduxFirebaseProvider { ...rrfProps }>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
