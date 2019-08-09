import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'

//import router from '@/router'

// import firebase
import { Firebase } from '@/firebase/init.js'

// Import Modules
import auth from './auth'
import app from './app'

// import my easy firestore modules
import userProfileModule from './userProfileModule'

Vue.use(Vuex)

// do the magic for vuex-easy-firestore 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore( 
  [userProfileModule],
  {logging: true, FirebaseDependency: Firebase}
)
// TODO: @ODO: Remember to turn off logging here for production builds

// include as PLUGIN in your vuex store
// please note that my modules should ONLY be passed via the plugin
const storeData = {
  strict: false,
  namespaced: true,
  plugins: [easyFirestore],
  modules: {
    app: app,
    auth: auth,
  }
  // ... my other store data
}

// initialise Vuex
const store = new Vuex.Store(storeData)

export default store
