import { Firebase, initFirebase } from '@/firebase/init.js' // eslint-disable-line
//import firebase from 'firebase/app'

import router from '@/router'
//import store from "@/store"

export default {
  namespaced: true,  
  state: {
    userId: null,
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
        console.log("SUCCESS signedIn from store.auth.js")
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
      dispatch('app/SetLoading', true, { root: true })
      .then( () => { 
        dispatch('userProfileModule/closeDBChannel', {clearModule: true}, { root: true })
      })      
      .then( () => {
        // TODO: @ODO set all other personal data null

        console.log("SUCCESS signedOut from store.auth.js")
        commit('SET_USER_ID', undefined)
        dispatch('app/SetLoading', false, { root: true })

        const currentRouter = router.app.$route
        if (currentRouter.meta && currentRouter.meta.authRequired) {
          router.push('/auth/signin')
        }

        dispatch('app/SetLoading', false, { root: true })
      })
      .catch( (error) => {
        console.log("ERROR signedOut from store.auth.js")
        console.log(error)
        commit('SET_ERROR',error)
        commit('SET_USER_ID', undefined)
        dispatch('app/SetLoading', false, { root: true })
      })
    },


    /**
     * Action to sign user in
     */
    signIn: ({ commit, dispatch }, { email, password }) => {
      dispatch('app/SetLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().signInWithEmailAndPassword(email, password)
      .then (() => {
        commit('SET_ERROR', null)
        dispatch('app/SetLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        dispatch('app/SetLoading', false, { root: true })
        //console.log("Error: auth/signIn:")
        //console.log(error)
      })
    },
    

    /**
     * Action to sign user out
     */
    signOut: ({ commit, dispatch }) => {
      dispatch('app/SetLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().signOut()
      .then (() => {
        commit('SET_ERROR', null)
        dispatch('app/SetLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        dispatch('app/SetLoading', false, { root: true })
        //console.log("Error: auth/signOut:")
        //console.log(error)
      })
    },


    /**
     * Action to sign user up
     */
    signUp: ({commit, dispatch }, payload) => {
      dispatch('app/SetLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      //.then( (user) => {
      //    const userData = dispatch('createUserFromFirebaseAuth', user )
      //    commit('setUser', userData)
      //  }
      //)
      .then (() => {
        dispatch('app/SetLoading', false, { root: true })
        commit('SET_ERROR', null)
      })
      .catch(function(error) {
        commit('SET_ERROR', error)
        dispatch('app/SetLoading', false, { root: true })
        //console.log("Error: auth/signUp:")
        //console.log(error)
      })
    },



    /**
     * Action to update user eMail
    */   
    updateEmail: async ({ commit, dispatch }, { payload })  => {
      dispatch('app/SetLoading', true, { root: true })
      commit('SET_ERROR', null)

      //console.log("updating email to:" + payload)
      
      var user = Firebase.auth().currentUser
      await user.updateEmail(payload)
      .then(function() {
        commit('changeUser', { email: payload}) // set ONLY user but NOT data!!!
        commit('SET_ERROR', null)
        dispatch('app/SetLoading', false, { root: true })
        console.log("updated email")
        return (null)
      })
      .catch(function(error) {
        console.log(error)
        //alert(error)
        //throw new Error(error);
        commit('SET_ERROR', error)
        dispatch('app/SetLoading', false, { root: true })
        return (error)
      })
    },


    /**
     * Action to update user password
    */   
    updatePassword: ({ commit, dispatch }, { payload }) => {
      dispatch('app/SetLoading', true, { root: true })
      commit('SET_ERROR', null)
      console.log("updating password to:" + payload)
      var user = Firebase.auth().currentUser
      user.updatePassword(payload).then(function() {
        commit('SET_ERROR', null)
        dispatch('app/SetLoading', false, { root: true })
        console.log("updated password")
        //return true
      }).catch(function(error) {
        //console.log(error)
        commit('SET_ERROR', error)
        dispatch('app/SetLoading', false, { root: true })
        alert(error)
      })
    },

  }
}

