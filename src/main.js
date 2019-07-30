import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import './registerServiceWorker'
import '@/util/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

