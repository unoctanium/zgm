import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import app from './app'
//import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false, //process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    app//,
    //products
  }
})