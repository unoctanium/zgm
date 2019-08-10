import { Firebase, initFirebase } from '@/firebase/init.js' // eslint-disable-line
//import firebase from 'firebase/app'

import router from '@/router'
//import store from "@/store"

export default {
  namespaced: true,  
  state: {
    userId: undefined,
    authError: ''
  },
  mutations: {
    SET_USER_ID: (state, value) => (state.userId = value),
    SET_ERROR: (state, value) => (state.authError = value),
  },
  getters: {
    getUserId: state => (state.userId),
    getAuthError: state => (state.authError)
  },
  actions: {

    /**
    * Setd ID of current user
    */
    // setUserId: ({ commit }, payload) => {
    // commit('SET_USER_ID',payload)
    // },

    /**
    * Resets error message
    */
    resetError: ({ commit }) => {
      commit('SET_ERROR',null)
    },

    /**
     * Callback fired when user signed in
     */
    signedin: ({ commit, dispatch }, user) => {

      console.log(user)

      const uid = user.uid
      //store.dispatch('userProfileModule/openDBChannel')
      //.catch(console.error)
      // or fetchAndAdd
      // or store.dispatch('userData/setUserId')
      // or store.dispatch('userData/setUserId', id)

      commit('SET_ERROR',null)
      dispatch('app/setLoading', true, { root: true })
      .then( () => { 
        dispatch('userProfileModule/openDBChannel', { uid }, { root: true })
      })
      .then( () => { 
        dispatch('userProfileModule/initIfNew', { uid }, { root: true })
      })
      .then( () => {
        console.log("SUCCESS signedIn from store.auth.js: " + uid)
        commit('SET_USER_ID', uid)
        dispatch('app/setLoading', false, { root: true })
      })
      .catch( (error) => {
        console.log("ERROR signedIn from store.auth.js")
        console.log(error)
        commit('SET_USER_ID', undefined)
        commit('SET_ERROR',error)
        dispatch('app/setLoading', false, { root: true })
      })

      /*
      if (emptyDoc) {
        // New User: fill profile data
        const providerData = firebaseAuthUser.providerData[0]
        const { displayName, photoURL, email } = providerData
        const newUserData = {
          email,
          displayName: displayName || '',
          photoURL: photoURL || '',
          phone: '',
          userLevel: 'guest'
        }
        store.dispatch('userProfieModule/patch', newUserData)
      }
      */

      // TODO: @Odo: get all other personal data
      // dispatch('products/getUserProducts', null, { root: true })

      //commit('app/setLoading', false, { root: true })
    },

    /**
     * Callback fired when user signed out
     */
    signedout: ({ commit, dispatch }) => {
      
      // set user data null
      //commit('setUser', null)
      commit('SET_ERROR',null)
      dispatch('app/setLoading', true, { root: true })
      .then( () => { 
        dispatch('userProfileModule/closeDBChannel', {clearModule: true}, { root: true })
      })      
      .then( () => {
        // TODO: @ODO set all other personal data null

        console.log("SUCCESS signedOut from store.auth.js")
        commit('SET_USER_ID', undefined)
        dispatch('app/setLoading', false, { root: true })

        const currentRouter = router.app.$route
        if (currentRouter.meta && currentRouter.meta.authRequired) {
          router.push('/auth/signin')
        }

        dispatch('app/setLoading', false, { root: true })
      })
      .catch( (error) => {
        console.log("ERROR signedOut from store.auth.js")
        console.log(error)
        commit('SET_ERROR',error)
        commit('SET_USER_ID', undefined)
        dispatch('app/setLoading', false, { root: true })
      })
    },


    /**
     * Action to sign user in
     */
    signIn: ({ commit, dispatch }, { email, password }) => {
      dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().signInWithEmailAndPassword(email, password)
      .then (() => {
        commit('SET_ERROR', null)
        dispatch('app/setLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        dispatch('app/setLoading', false, { root: true })
        //console.log("Error: auth/signIn:")
        //console.log(error)
      })
    },
    

    /**
     * Action to sign user out
     */
    signOut: ({ commit, dispatch }) => {
      dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().signOut()
      .then (() => {
        commit('SET_ERROR', null)
        dispatch('app/setLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        dispatch('app/setLoading', false, { root: true })
        //console.log("Error: auth/signOut:")
        //console.log(error)
      })
    },


    /**
     * Action to sign user up
     */
    signUp: ({commit, dispatch }, payload) => {
      dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      //.then( (user) => {
      //    const userData = dispatch('createUserFromFirebaseAuth', user )
      //    commit('setUser', userData)
      //  }
      //)
      // .then(() => {

      // }
      .then (() => {
        dispatch('app/setLoading', false, { root: true })
        commit('SET_ERROR', null)
      })
      .catch(function(error) {
        commit('SET_ERROR', error)
        dispatch('app/setLoading', false, { root: true })
        //console.log("Error: auth/signUp:")
        //console.log(error)
      })
    },



    /**
     * Action to update user eMail
    */   
    updateEmail: ({ dispatch }, payload)  => {
      //dispatch('app/setLoading', true, { root: true })
      //commit('SET_ERROR', null)

      console.log("updating email to:" + payload.newEmail + " with pw: " + payload.currentPassword)
      
      Firebase.auth().signInWithEmailAndPassword(payload.currentEmail, payload.currentPassword)
      .then(function() {
        Firebase.auth().currentUser.updateEmail(payload.newEmail)
      })
      .then(function() { 
        dispatch('userProfileModule/patch', { email: payload.newEmail }, { root: true })
      })
      .then(function() {
        return
      })
      //.then(function() {
        //commit('SET_ERROR', null)
        //dispatch('app/setLoading', false, { root: true })
      //})
      .catch(function(error) {
        //console.log(error)
        alert(error)
        //commit('SET_ERROR', error)
        //dispatch('app/setLoading', false, { root: true })
      })
    },


    /**
     * Action to update user password
    */   
    updatePassword: ( { dispatch}, payload ) => { // eslint-disable-line
      //dispatch('app/setLoading', true, { root: true })
      //commit('SET_ERROR', null)
      console.log("updating password to:" + payload.newPassword)
      
      Firebase.auth().signInWithEmailAndPassword(payload.currentEmail, payload.currentPassword)
      .then(function() {
        Firebase.auth().currentUser.updatePassword(payload.newPassword)
      })
      .then(function() {
        return
      })
      //.then(function() {
        //commit('SET_ERROR', null)
        //dispatch('app/setLoading', false, { root: true })
      //  console.log("updated password")
        //return true
      //})
      .catch(function(error) {
        //console.log(error)
        //commit('SET_ERROR', error)
        //dispatch('app/setLoading', false, { root: true })
        alert(error)
      })
    },

  }
}

