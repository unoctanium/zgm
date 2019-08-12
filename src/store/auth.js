import { Firebase, initFirebase } from '@/firebase/init.js' // eslint-disable-line
import router from '@/router'

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
    resetError: ({ commit }) => {
      commit('SET_ERROR',null)
    },

    /**
     * Callback fired when user signed in
     */
    signedin: async ({ commit, dispatch }, user) => {

      //console.log(user)
      const uid = user.uid
      console.log("signedin")
      console.log(user)
      commit('SET_USER', user)
      commit('SET_ERROR',null)
      //dispatch('app/setLoading', true, { root: true })
      
      //.then( () => { 
        console.log("openDBChannel")
        await dispatch('userProfileModule/openDBChannel', { uid }, { root: true })
        // Explanation:
        // store.dispatch('userProfileModule/openDBChannel')
        // .catch(console.error)
        // or fetchAndAdd
        // or store.dispatch('userData/setUserId')
        // or store.dispatch('userData/setUserId', id)
      //})
      //.then( () => { 
        //console.log("initIfNew")
        dispatch('userProfileModule/initIfNew', user, { root: true })
        
      //})
      .then( () => {
        console.log("SUCCESS signedIn from store.auth.js: " + uid)
        //commit('SET_USER', user)
        //dispatch('app/setLoading', false, { root: true })
        
      })
      .catch( (error) => {
        commit('SET_ERROR',error)
        commit('SET_USER', undefined)
        //dispatch('app/setLoading', false, { root: true })
        console.log("ERROR signedIn from store.auth.js")
        console.log(error)
      })
    },

    /**
     * Callback fired when user signed out
     */
    /*
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

      })
      .catch( (error) => {
        commit('SET_ERROR',error)
        commit('SET_USER_ID', undefined)
        dispatch('app/setLoading', false, { root: true })
        console.log("ERROR signedOut from store.auth.js")
        console.log(error)
      })
    },
    */


    /**
     * Action to sign user in
     */
    signIn: ({ commit }, { email, password }) => {
      //dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().signInWithEmailAndPassword(email, password)
      .then (() => {
        console.log("signedInWithUsernameAndPassword")
        commit('SET_ERROR', null)
        //dispatch('app/setLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        //dispatch('app/setLoading', false, { root: true })
        console.log("Error: auth/signIn:")
        console.log(error)
      })
    },
    

    /**
     * Action to sign user out
     */
    signOut: ({ commit, dispatch }) => {
      //dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      //Firebase.auth().signOut()
      ///ODO
      console.log("closeDBChannel")
      dispatch('userProfileModule/closeDBChannel', {clearModule: true}, { root: true })
      .then( () => { 
        console.log("signOut")
        Firebase.auth().signOut()
      })    
      /// EEE  
      .then (() => {
        commit('SET_USER', undefined)
        commit('SET_ERROR', null)
        //dispatch('app/setLoading', false, { root: true })
        
        //this.$router.replace('/auth/signin')
        router.replace('/auth/signin')
        //window.location.reload();
        
        /// ODO
        console.log("SUCCESS signedOut from store.auth.js")
        
        //const currentRouter = router.app.$route
        //if (currentRouter.meta && currentRouter.meta.authRequired) {
        //  router.push('/auth/signin')
        //}
        /// EEE
      })
      .catch((error) =>{
        commit('SET_ERROR', error)
        //dispatch('app/setLoading', false, { root: true })
        console.log("Error: auth/signOut:")
        console.log(error)
      })
    },


    /**
     * Action to sign user up
     */
    signUp: ({commit }, payload) => {
      //dispatch('app/setLoading', true, { root: true })
      commit('SET_ERROR', null)

      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then (() => {
        console.log("createUserWithEmailAndPassword")
        //dispatch('app/setLoading', false, { root: true })
        commit('SET_ERROR', null)
      })
      .catch(function(error) {
        commit('SET_ERROR', error)
        //dispatch('app/setLoading', false, { root: true })
        console.log("Error: auth/signUp:")
        console.log(error)
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
      .then((userCredential) => {
        //Firebase.auth().currentUser.updateEmail(payload.newEmail)
        userCredential.user.updateEmail(payload.newEmail)
      })
      .then(() => { 
        dispatch('userProfileModule/patch', { email: payload.newEmail }, { root: true })
      })
//      .then(function() {
//        return
//      })
      //.then(function() {
        //commit('SET_ERROR', null)
        //dispatch('app/setLoading', false, { root: true })
      //})
      .catch((error) => {
        console.log(error.message)
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
        return
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

