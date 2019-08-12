import * as Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'
import store from "@/store"

import config from './config'

function initFirebase () {
  Firebase.initializeApp(config)
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence({synchronizeTabs:true})
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.log("ERROR from firebase/init.js:")
          alert(err)
          reject(err)
          router.push('/error')
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          console.log("ERROR from firebase/init.js:")
          alert(err)
          reject(err)
          router.push('/error')
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

function registerFirebaseAuthStateChanged() {

  return new Promise((resolve, reject) => {
    try {
      Firebase.auth()
      .onAuthStateChanged(user => {
          if (user) {
            // user is logged in so initialize him
            store.dispatch('auth/signedin', user)
              .catch(console.error)
          }
          resolve(user);
      });
    } catch {
      alert('api failed')
      reject('api failed')
    }
  })

}

export { Firebase, initFirebase, registerFirebaseAuthStateChanged }

