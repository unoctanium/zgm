import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import './registerServiceWorker'
import '@/util/handle-network-status'
//import '@/firebase/init'
//import '@/firebase/authentication'
//import { isNull } from "@/util"
import { initFirebase, registerFirebaseAuthStateChanged } from '@/firebase/init.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created()  {

  // initFirebase
  initFirebase()
  .then(() => {    
//    registerFirebaseAuthStateChanged()
  })
  .catch(error => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
    console.log("ERROR from store/index.js:")
    console.log(error)
    router.push('/error')
  })
  registerFirebaseAuthStateChanged()
  


    

  },
  render: h => h(App)
}).$mount('#app')

