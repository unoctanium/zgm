//import firebase from 'firebase/app'
import * as Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from "@/store"

import config from './config'

function initFirebase () {
  Firebase.initializeApp(config)
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
            console.log("ERROR from firebase/init.js:")
            console.log(err)
            reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
            console.log("ERROR from firebase/init.js:")
            console.log(err)
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}



function registerFirebaseAuthStateChanged() {
  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // user is logged in so initialize him
      store.dispatch('auth/signedin', {user: user})
        .catch(console.error)
    }
    else {
      // user is logged in so initialize him
      store.dispatch('auth/signedout')
        .catch(console.error)
    }
  })
  // register onAuthStateChanged
  // Firebase.auth().onAuthStateChanged(user => {
  //   const actionToDispatch = (!isNull(user)) ? 'signedin' : 'signedout'
  //   this.$store.dispatch(`auth/${actionToDispatch}`, user)
  // })

}

export { Firebase, initFirebase, registerFirebaseAuthStateChanged }