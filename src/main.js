import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/util/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'

Vue.config.productionTip = false
//Vue.use(FirebaseAuthPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
