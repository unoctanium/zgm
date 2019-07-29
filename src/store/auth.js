import firebase from 'firebase/app'
import router from '@/router'
import UsersDB from '@/firebase/users-db'
import { isNull } from "@/util"

export default {
  namespaced: true,  
  state: {
    user: null,
    authError: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.authError = payload
    },
  },
  getters: {
    isUserLoggedIn: state => (!isNull(state.user))
  },
  actions: {

    /**
    * Resets error message
    */
    resetError: ({ commit }) => {
      commit('setError',null)
    },

    /**
     * Callback fired when user signed in
     */
    signedin: async ({ commit, dispatch }, firebaseAuthUser) => {
      commit('app/setLoading', true, { root: true })
      const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)
      if (isNull(userFromFirebase)) {
        // New User: fill profile datra
        commit('setUser', dispatch('createUserFromFirebaseAuth', firebaseAuthUser ))
      }
      else {
        // existing user
        commit('setUser', userFromFirebase)
      }

      // get all other personal data
      // dispatch('products/getUserProducts', null, { root: true })

      commit('app/setLoading', false, { root: true })
    },

    /**
     * Callback fired when user signed out
     */
    signedout: ({ commit }) => {
      commit('setUser', null)
      
      // set all other personal data null
      //commit('products/setProducts', null, { root: true })
  
      const currentRouter = router.app.$route
      if (currentRouter.meta && currentRouter.meta.authRequired) {
        router.push('/auth/signin')
      }
    },


    /**
     * Action to sign user in
     */
    signIn: async ({ commit }, { email, password }) => {
      commit('app/setLoading', true, { root: true })
      commit('setUser', null)
      commit('setError', null)

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then (() => {
        commit('setError', null)
        commit('app/setLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('setError', error)
        commit('setUser', null)
        commit('app/setLoading', false, { root: true })
        //console.log("Error: auth/signIn:")
        //console.log(error)
      })
    },
    

    /**
     * Action to sign user out
     */
    signOut: async ({ commit }) => {
      commit('app/setLoading', true, { root: true })
      commit('setUser', null)
      commit('setError', null)

      firebase.auth().signOut()
      .then (() => {
        commit('setUser', null)
        commit('setError', null)
        commit('app/setLoading', false, { root: true })
      })
      .catch((error) =>{
        commit('setError', error)
        commit('setUser', null)
        commit('app/setLoading', false, { root: true })
        //console.log("Error: auth/signOut:")
        //console.log(error)
      })
    },


    /**
     * Action to sign user up
     */
    signUp ({commit, dispatch}, payload) {
      commit('app/setLoading', true, { root: true })
      commit('setUser', null)
      commit('setError', null)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setUser', dispatch('createUserFromFirebaseAuth', user ))
        }
      )
      .then (() => {
        commit('app/setLoading', false, { root: true })
        commit('setError', null)
        //router.push('/profile')
      })
      .catch(function(error) {
        commit('setError', error)
        commit('setUser', null)
        commit('app/setLoading', false, { root: true })
        //console.log("Error: auth/signUp:")
        //console.log(error)
      })
    },

    /**
     * Internal Action to create a new user doc in user-db if there is none for the firebaseAuthUser
     */
    // eslint-disable-next-line
    createUserFromFirebaseAuth: ( {commit}, firebaseAuthUser) => { 
      const providerData = firebaseAuthUser.providerData[0]
      const { displayName, photoURL, email } = providerData
      const userDb = new UsersDB()
      const user = {
        displayName,
        photoURL,
        email,
        userLevel: 'free',
        isAdmin: false
      }
      return userDb.create(user, firebaseAuthUser.uid)
    },

    /**
     * Action to update user data
     */
    /*
    updateUserData ({commit}, payload) {

      
      commit('app/setLoading', true)


      var user = firebase.auth().currentUser

      user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
      
      user.updateEmail("user@example.com").then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
      
      var user = firebase.auth().currentUser;
      var newPassword = getASecureRandomPassword();
      
      user.updatePassword(newPassword).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
      


      const updateUserObj = {}
      let filename
      let ext
      console.log('PAYLOAD', payload)
      if (payload.firstName) {
        updateUserObj.firstName = payload.firstName
      }
      if (payload.lastName) {
        updateUserObj.lastName = payload.lastName
      }
      if (payload.avatar) {
        updateUserObj.avatar = payload.avatar
      }
      if (payload.currency) {
        updateUserObj.currency = payload.currency
      }
      if (payload.location) {
        updateUserObj.location = payload.location
      }
      if (payload.timeZone) {
        updateUserObj.timeZone = payload.timeZone
      }
      if (payload.longitude) {
        updateUserObj.longitude = payload.longitude
      }
      if (payload.latitude) {
        updateUserObj.latitude = payload.latitude
      }
      if (payload.language) {
        updateUserObj.language = payload.language
      }
      if (payload.updated) {
        updateUserObj.updated = payload.updated
      }
      if (payload.image) {
        filename = payload.image.name
        ext = filename.slice(filename.lastIndexOf('.'))
        updateUserObj.imageExt = ext
      }

      // eslint-disable-next-line
      let imageUrl
      let key = firebase.auth().currentUser.uid
      let userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
      // eslint-disable-next-line
      let setWithMerge = userRef.set({
        ...updateUserObj
      }, { merge: true })
        .then(() => {
          return firebase.storage().ref('users/' + key + ext).put(payload.image)
        })
      .then(() => {
        commit('app/setLoading', false)
        console.log('This is the push of the USER payload', payload)
        commit('setUser', payload)
      })
      .catch(error => {
        console.log(error)
        commit('app/setLoading', false)
      })
      console.log('at the end of the loop')
    }
    */
  }
}

