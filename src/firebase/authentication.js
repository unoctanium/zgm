import firebase from 'firebase/app'

import store from '@/store'
import { isNull } from "@/util"

firebase.auth().onAuthStateChanged(firebaseUser => {
  const actionToDispatch = (!isNull(firebaseUser)) ? 'signedin' : 'signedout'
  store.dispatch(`auth/${actionToDispatch}`, firebaseUser)
})
