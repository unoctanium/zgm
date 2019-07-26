import store from '@/store'
import Firebase from 'firebase'
import 'firebase/firestore'

import config from './config'

export default {
  // eslint-disable-next-line  
  install: (Vue, options) => {
    const firebase = Firebase.initializeApp(config)
    const auth = firebase.auth()
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    }
    
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
      //store.dispatch('fetchUserData') //ODO!!!!!!!
    })
    
  }
}