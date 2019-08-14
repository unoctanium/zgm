import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import '@/util/registerServiceWorker'
import '@/util/handle-network-status'

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

import { initFirebase, registerFirebaseAuthStateChanged } from '@/firebase/init.js'

Vue.config.productionTip = false


initFirebase()
.then(() => {    
  registerFirebaseAuthStateChanged()
})
.then(() => {

  new Vue({
    router,
    store: store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

})
.catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
  console.log("ERROR from main.js")
  console.log(error)
  alert(error)
  router.push('/error')
})


