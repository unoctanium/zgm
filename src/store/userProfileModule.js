import { Firebase  } from '@/firebase/init.js'
import "firebase/storage"
import Vue from 'vue'


const userProfileModule = {
  firestorePath: 'users/{userId}',
  firestoreRefType: 'doc', // or 'collection' or doc'
  moduleName: 'userProfileModule',
  statePropName: 'user',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {
    
    /**
     * Action to update user profile data and image in store
     */   
    updateUserProfile: ({ dispatch, rootGetters }, { data, image }) => {

      const id = rootGetters['auth/getUser'].uid
      
      // case: we have aphoto to upload. So we upload it and then we call uploadData()
      if (image.newImage) {

        const storageRef = Firebase.storage().ref()
        const fileExt = image.newImage.name.slice(image.newImage.name.lastIndexOf('.'))
        const fileRef = storageRef.child('users/' + id + '.' + fileExt)

        var uploadTask = fileRef.put(image.newImage)
        uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
          
          function(snapshot) { // eslint-disable-line
            //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100
            //console.log('Upload is ' + progress + '% done') 
          },
          function (error) { // eslint-disable-line
            // An error happened during image upload
            //console.log(error);
            Vue.prototype.$dialog.error({
              text: 'Error furing image upload: ' + error,
              title: 'Error',
              persistent: true
            })
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              console.log('userProfileModule.js: File available at ' + downloadURL)
              dispatch('patch', { ...data, photoURL: downloadURL }) 
            })
            .catch(function(error) { // eslint-disable-line
              // An error happened when getting downloadURL
              //console.log(error);
              Vue.prototype.$dialog.error({
                text: 'Error getting downloadURL',
                title: 'Error',
                persistent: true
              })
            })
          }
        )

      }
      // case: we deleted photo it in the profile view
      // we have an old photoURL in the store. In this case we delete the photo from the store prior to uploading data
      else if (!image.newPhotoURL && image.oldPhotoURL) {

        const storageRef = Firebase.storage().ref()
        const fileExt1 = image.oldPhotoURL.slice(image.oldPhotoURL.lastIndexOf('.'))
        const fileExt = fileExt1.slice(0, fileExt1.indexOf('?'))
        const fileRef = storageRef.child('users/' + id + '.' + fileExt)
        // Delete the file
        fileRef.delete()
        .then(function() {
          // File deleted successfully. Now we upload data
          dispatch('patch', { ...data, photoURL: null }) 
        })
        .catch(function(error) { // eslint-disable-line
          // An error happened during deleting old image
          //console.log(error);
          Vue.prototype.$dialog.error({
            text: "Error on deleting file: " + 'users/' + id + '.' + fileExt,
            title: 'Error',
            persistent: true
          })
        })
      }
      // case: we didnt touch photo
      else {
        console.log("patching user profile")
        dispatch('patch', { ...data }) 
      }
    },

    /**
     * Action to update user data
     */   
    updateUserData: ({ dispatch }, { data }) => {
      console.log("patching user data")
      dispatch('patch', { ...data }) 
    },


    /**
     * Action to initialize user data if it is empty
     */   
    
    initIfNew: ({ dispatch, rootState } ,user ) => { // eslint-disable-line

      return new Promise( (resolve, reject) => { // eslint-disable-line

        if(rootState.userProfileModule.user.email) {
          resolve()
          return
        }

        const data = {
          email: user.email,
          userLevel: 'user',
          settings:{
            darkMode: false,
            showMenu: false
          }
        }
        dispatch('patch', { ...data })
        .then(() => {
          //console.log("patched user profile")
          resolve()
        })
        .catch((error) => {
          // an Error happened during patching bew user data
          //console.log(error);
          Vue.prototype.$dialog.error({
            text: 'Error when patching new user data',
            title: 'Error',
            persistent: true
          })
          reject(error)
        })
      })
    }
  },
}
  
export default userProfileModule