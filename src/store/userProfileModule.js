import { Firebase  } from '@/firebase/init.js'

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

      //commit('app/setLoading' true, { root: true })
      console.log("data from updateUserProfile")
      console.log(data)
      console.log(image)

      const id = rootGetters['auth/getUserId']
      //console.log(id)


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
            console.log('Upload error: ')
            console.log(error)
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              console.log('userProfileModule.js: File available at ' + downloadURL)
              dispatch('patch', { ...data, photoURL: downloadURL }) 
            })
            .catch(function(error) {
              // Uh-oh, an error occurred!
              console.log("Error on getting downloadURL")
              console.log(error)
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
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("Error on deleting file: " + 'users/' + id + '.' + fileExt)
          console.log(error)
        })
      }
      // case: we didnt touch photo
      else {
        dispatch('patch', { ...data }) 
      }
    },

    /**
     * Action to update user data
     */   
    updateUserData: ({ dispatch }, { data }) => {
      dispatch('patch', { ...data }) 
    },

    /**
     * Action to initialize user data if it is empty
     */   
    initIfNew: ({ dispatch, state } , uid ) => { // eslint-disable-line

      return new Promise( (resolve, reject) => { // eslint-disable-line
        console.log("NEW")
        console.log(state.user)
        
        const data = {
          email: Firebase.auth().currentUser.email,
          userLevel: 'user',
          settings:{
            darkMode: false,
            showMenu: false
          }
        }
        dispatch('patch', { ...data })
        .then(() => {resolve})
        .catch((error) => {reject(error)})
        
        resolve
      })
    
    }

  },

}
  
export default userProfileModule