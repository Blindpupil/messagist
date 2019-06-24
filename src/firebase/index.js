import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import firebaseConfig from './config'


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.firestore().settings({
  timestampsInSnapshots: true
})

export default firebase