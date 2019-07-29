import firebase from 'firebase'
import 'firebase/firestore';
import router from '@/router'
import UsersDB from '@/firebase/users-db'

export default {
  namespaced: true,  
  state: {
    user: null,
    userProfile: null,
    error: null
  },
  mutations: {
    /*
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },*/
    setUser (state, payload) {
      state.user = payload
    },
    setProfile (state, payload) {
      state.userProfile = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    isUserLoggedIn: state => (state.user != null)
  },
  actions: {

    signin: async ({ commit, dispatch }, firebaseAuthUser) => {
      const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)
  
      const user = (userFromFirebase == null)
  //      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
  //      : userFromFirebase
  
      commit('setUser', user)
      dispatch('getUserProfile', null, { root: true })
    },
  
    /**
     * Callback fired when user logout
     */
    signout: ({ commit }) => {
      commit('setUser', null)
      commit('setProfile', null)
      //commit('products/setProducts', null, { root: true })
  
      const currentRouter = router.app.$route
      if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
        router.push('/login')
      }

    },

    signup ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .then(
        // eslint-disable-next-line
        user => {
          const dateNow = new Date()
          firebase.firestore().collection("users").doc(this.state.user.id).set({
            userLevel: 'free',
            joinDate: dateNow.toISOString(),
            isAdmin: false
          })
        }
      )
      .then(
        router.push('/profile')
      )
      .catch(function(error) {
        commit('setError', error)
        console.log(error)
      })
    },

    // eslint-disable-next-line
    fetchUserData ({commit, getters}) {

      if(this.state.user == null)
        return

      let currentUser = this.state.user.uid
      commit('app/setLoading', true)
      var docRef = firebase.firestore().collection('/users').doc(currentUser)
      docRef.get().then(function(doc) {
        if (doc.exists) {
          commit('setProfile', doc.data())
        } else {
          this.state.usersProfile = null
        }
      })
      .catch(
        error => {
          commit('app/setLoading', false)
          commit('setError', error)
        }
      )
    },
    updateUserData ({commit}, payload) {
      commit('app/setLoading', true)
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
  }
}

