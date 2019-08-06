import firebase from 'firebase/app'
import 'firebase/storage' 

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
    changeUser (state, payload) {
      if (payload.email && payload.email != '') { state.user.email = payload.email; console.log("changed email to " + payload.email) }
      if (payload.displayName && payload.dsiplayName != '') { state.user.displayName = payload.displayName }
      if (payload.phone && payload.phone != '') { state.user.phone = payload.phone }
      if (payload.photoURL && payload.photoURL != '') { state.user.photoURL = payload.photoURL }
      if (payload.userLevel && payload.userLevel != '') { state.user.userLevel = payload.email }
    }
  },
  getters: {
    isUserLoggedIn: state => (!isNull(state.user)),
    //getUser: state => (state.user)
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
    signedin: async ({ commit }, firebaseAuthUser) => {
      commit('app/setLoading', true, { root: true })
      const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)
  
      if (isNull(userFromFirebase)) {
        // New User: fill profile data
        const providerData = firebaseAuthUser.providerData[0]
        const { displayName, photoURL, email } = providerData
        const user = {
          email,
          displayName: displayName || '',
          photoURL: photoURL || '',
          phone: '',
          userLevel: 'guest'
        }
        const userProfile = await new UsersDB().create(user, firebaseAuthUser.uid)
        commit('setUser', userProfile)
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
    signUp: async ({commit }, payload) => {
      commit('app/setLoading', true, { root: true })
      commit('setUser', null)
      commit('setError', null)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      //.then( (user) => {
      //    const userData = dispatch('createUserFromFirebaseAuth', user )
      //    commit('setUser', userData)
      //  }
      //)
      .then (() => {
        commit('app/setLoading', false, { root: true })
        commit('setError', null)
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
     * Action to update user data
     */   
    updateProfile: async ({ commit }, { data, image, oldPhotoURL }) => {
      commit('app/setLoading', true, { root: true })
      commit('setError', null)
      
      // upload all data except photo, but: photoURL of stored photo
      async function uploadData(downloadURL) {
        console.log('now uploading Data for ' + data.id)

        const userDb = new UsersDB()
        const updateData = {
          ...data,
          photoURL: downloadURL || ''
        }
        await userDb.update(updateData)
        .then (() => {
          //console.log("updating profile")
          firebase.auth().currentUser.updateProfile({
            displayName: updateData.displayName,
            photoURL: updateData.photoURL
          })
          console.log("updated profile")
        })
        .then (() => {
          commit('setUser', updateData )
          commit('setError', null)
          commit('app/setLoading', false, { root: true })
        })
        .catch((error) =>{
          commit('setError', error)
          commit('app/setLoading', false, { root: true })
          console.log("Error: auth/update:")
          console.log(error)
        })
      }

      // case: we have aphoto to upload. So we upload it and then we call uploadData()
      if (image) {

        const storageRef = firebase.storage().ref()
        const fileExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileRef = storageRef.child('users/' + data.id + '.' + fileExt)

        var uploadTask = fileRef.put(image)

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          
          function(snapshot) { // eslint-disable-line
            //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100
            //console.log('Upload is ' + progress + '% done') 
          },
          function (error) { // eslint-disable-line
            console.log('Upload error: ')
            console.log(error)
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              console.log('File available at ' + downloadURL)
              uploadData(downloadURL)
            })
          }
        )

      }
      // case: we have no photo (or we deleted it in the profile view)
      else {
        // case: we have an old photoURL in the store. In this case we delete the photo from the store prior to uploading data
        if (oldPhotoURL) {
          const storageRef = firebase.storage().ref()
          const fileExt1 = oldPhotoURL.slice(oldPhotoURL.lastIndexOf('.'))
          const fileExt = fileExt1.slice(0, fileExt1.indexOf('?'))
          const fileRef = storageRef.child('users/' + data.id + '.' + fileExt)
          // Delete the file
          fileRef.delete().then(function() {
            // File deleted successfully. Now we upload data
            uploadData()
          }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log("Error on deleting file: " + 'users/' + data.id + '.' + fileExt)
            console.log(error)
          })
        }
        else {
          uploadData()
        }
      }
    },

    /**
     * Action to update user eMail
    */   
    updateEmail: async ({ commit }, { payload })  => {
      commit('app/setLoading', true, { root: true })
      commit('setError', null)

      console.log("updating email to:" + payload)
      var user = firebase.auth().currentUser
      await user.updateEmail(payload)
      .then(function() {
        commit('changeUser', { email: payload}) // set ONLY user but NOT data!!!
        commit('setError', null)
        commit('app/setLoading', false, { root: true })
        console.log("updated email")
        return (null)
      })
      .catch(function(error) {
        console.log(error)
        //alert(error)
        //throw new Error(error);
        return (error)
      })
    },


    /**
     * Action to update user eMail
    */   
    updatePassword: ({ commit }, { payload }) => {
      commit('app/setLoading', true, { root: true })
      commit('setError', null)
      console.log("updating password to:" + payload)
      var user = firebase.auth().currentUser
      user.updatePassword(payload).then(function() {
        commit('setError', null)
        commit('app/setLoading', false, { root: true })
        console.log("updated password")
        //return true
      }).catch(function(error) {
        //console.log(error)
        alert(error)
      })
    },

  }
}

