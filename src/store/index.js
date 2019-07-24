import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // showInstallBanner: true
  },
  mutations: {
    /*
    UPDATE_INSTALL_BANNER(state, showInstallBanner) {
      //Vue.set(state, 'showInstallBanner', showInstallBanner);
      state.showInstallBanner = showInstallBanner
    },
    */
  },
  actions: {
    /*
    updateInstallBanner(context, bvalue) {
      context.commit("UPDATE_INSTALL_BANNER", bvalue);
    }
    */
  },
  getters: {
    /*
      showInstallBanner: state => state.showInstallBanner,
    */
  }

})
