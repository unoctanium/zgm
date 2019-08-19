import { Firebase, initFirebase } from '@/firebase/init.js' // eslint-disable-line
import router from '@/router'
import Vue from 'vue'

export default {
  namespaced: true,  
  state: {
    user: undefined,
    authError: ''
  },
  mutations: {
    SET_USER: (state, value) => (state.user = value),
    SET_ERROR: (state, value) => (state.authError = value),
  },
  getters: {
    getUser: state => (state.user),
    getAuthError: state => (state.authError)
  },
  actions: {

    /**
    * Resets error message
    */
    resetError ({ commit })  {
      commit('SET_ERROR',null)
    },

    /**
     * Callback fired when user signed in
     */
    signedin ({ commit, dispatch }, user) {
      const uid = user.uid
      commit('SET_USER', user)
      commit('SET_ERROR',null)
      dispatch('userProfileModule/openDBChannel', { uid }, { root: true })
        // Explanation:
        // store.dispatch('userProfileModule/openDBChannel')
        // .catch(console.error)
        // or fetchAndAdd
        // or store.dispatch('userData/setUserId')
        // or store.dispatch('userData/setUserId', id)
      .then( () => { 
        dispatch('userProfileModule/initIfNew', user, { root: true })
      })
      .then( () => { 
        dispatch('testCollectionModule/openDBChannel', {}, { root: true })
      })
      //.then( () => {
        //console.log("SUCCESS signedIn from store.auth.js: " + uid)
      //})
      .catch( (error) => {
        commit('SET_ERROR',error)
        commit('SET_USER', undefined)
        // An error happened after signing in
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Error after signing in: ' + error,
          title: 'Error',
          persistent: true
        })
      })
    },


    /**
     * Action to sign user in
     */
    signIn ({ commit }, { email, password }) {
      commit('SET_ERROR', null)
      Firebase.auth().signInWithEmailAndPassword(email, password)
      .then (() => {
        commit('SET_ERROR', null)
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        // An error happened during sign in
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Error when signing in: ' + error,
          title: 'Error',
          persistent: true
        })
      })
    },
    

    /**
     * Action to sign user out
     */
    signOut ({ commit, dispatch }) {
      
      commit('SET_ERROR', null)
      dispatch('userProfileModule/closeDBChannel', {clearModule: true}, { root: true })
      .then( () => { 
        dispatch('userProfileModule/closeDBChannel', {clearModule: true}, { root: true })
      })
      .then( () => { 
        Firebase.auth().signOut()
      })    
      .then (() => {
        commit('SET_USER', undefined)
        commit('SET_ERROR', null)
        router.replace('/auth/signin')
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        // An error happened during sign out
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Error when signing out: ' + error,
          title: 'Error',
          persistent: true
        })
      })
    },


    /**
     * Action to sign user up
     */
    signUp ({commit }, payload) {
      commit('SET_ERROR', null)
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then (() => {
        commit('SET_ERROR', null)
        router.replace('/')
      })
      .catch(function(error) {
        commit('SET_ERROR', error)
        // An error happened during sign up
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Error when signing up: ' + error,
          title: 'Error',
          persistent: true
        })
      })
    },


    /**
     * Action to update user eMail
    */   
    updateEmail ({dispatch}, payload)  { // eslint-disable-line
      Firebase.auth().signInWithEmailAndPassword(payload.currentEmail, payload.currentPassword)  
      .then(function (userCredential) {
        userCredential.user.updateEmail(payload.newEmail)  // update new email
        .then(function () {
          // Update successful.
          //console.log("email update sucessfull");
          dispatch('userProfileModule/patch', { email: payload.newEmail }, { root: true })
        }).catch(function (error) { // eslint-disable-line
          // if updated user email already exists, it returns error code: auth/email-already-in-use
          //console.log(error);
          Vue.prototype.$dialog.error({
            text: 'Cannot change Email. Maybe already in use?',
            title: 'Error',
            persistent: true
          })
        })
      })
      .catch(function (error) { // eslint-disable-line
        // An error happened during re-authenticate
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Cannot change Email. Wrong password?',
          title: 'Error',
          persistent: true
        })
      })
    },


    /**
     * Action to update user password
    */   
    updatePassword ({}, payload)  { // eslint-disable-line
      Firebase.auth().signInWithEmailAndPassword(payload.currentEmail, payload.currentPassword)  
      .then(function (userCredential) {
        userCredential.user.updatePassword(payload.newPassword)  // update new email
        //.then(function () {
          // Update successful.
          //console.log("password update");
        //})
        .catch(function (error) {
          // An error happened. User Maybe not followed password rules?
          // if updated user email already exists, it returns error code: auth/email-already-in-use
          console.log(error);
          Vue.prototype.$dialog.error({
            text: 'Cannot change Email. Maybe already in use?',
            title: 'Error',
            persistent: true
          })
        })
      })
      .catch(function (error) { // eslint-disable-line
        // An error happened during re-authenticate
        //console.log(error);
        Vue.prototype.$dialog.error({
          text: 'Cannot change Email. Wrong password?',
          title: 'Error',
          persistent: true
        })
      })
    },

  }
}

