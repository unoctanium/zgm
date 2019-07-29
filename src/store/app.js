//import Vue from 'vue'
//import Vuex from 'vuex'

export default {
  namespaced: true,
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    appShortTitle: process.env.VUE_APP_SHORT_TITLE,
    appVersion: process.env.VUE_APP_VERSION,
    loading: false,
    networkOnLine: true,
    /*
    SWRegistrationForNewContent: null,
    showAddToHomeScreenModalForApple: false,
    refreshingApp: false
    */
  },
  mutations: {
    setLoading: (state, value) => (state.loading = value),
    setNetworkOnline: (state, value) => (state.networkOnLine = value),

    /*
    setSWRegistrationForNewContent: (state, value) => (state.SWRegistrationForNewContent = value),
    setShowAddToHomeScreenModalForApple: (state, value) => (state.showAddToHomeScreenModalForApple = value),
    setRefreshingApp: (state, value) => (state.refreshingApp = value)
    */
  },
  actions: {
    
    /**
    * Closes "add to home screen" modal for apple
    */
   /*
    closeAddToHomeScreenModalForApple: async ({ commit }) => {
      localStorage.setItem('addToHomeIosPromptLastDate', Date.now())
      commit('setShowAddToHomeScreenModalForApple', false)
    },
    */

    /**
    * Trigger service worker skipWating so the new service worker can take over.
    * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
    */
   /*
    serviceWorkerSkipWaiting({ state, commit }) {
      if (state.SWRegistrationForNewContent != null) 
        return
      commit('setRefreshingApp', true)
      state.SWRegistrationForNewContent.waiting.postMessage('skipWaiting')
    }
    */
  },
  getters: {
    //newContentAvailable: state => (state.SWRegistrationForNewContent != null)
  }
}