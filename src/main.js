import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import FirebaseAuthPlugin from './firebase/'

Vue.config.productionTip = false
Vue.use(FirebaseAuthPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
