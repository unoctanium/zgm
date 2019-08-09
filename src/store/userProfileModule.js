import { Firebase, initFirebase } from '@/firebase/init.js' // eslint-disable-line

const userProfileModule = {
    firestorePath: 'users/{userId}',
    firestoreRefType: 'doc', // or 'collection' or doc'
    moduleName: 'userProfileModule',
    statePropName: 'data',
    namespaced: true, // automatically added
  
    // this object is your store module (will be added as '/myModule')
    // you can also add state/getters/mutations/actions
    state: {},
    getters: {},
    mutations: {},
    actions: {

    /**
     * Action to update user data
     */   
    uploadPhoto: async ({ commit }, { id, image, oldPhotoURL }) => {

        commit('app/setLoading', true, { root: true })
        commit('setError', null)
        
        
        // case: we have aphoto to upload. So we upload it and then we call uploadData()
        if (image) {
  
          const storageRef = Firebase.storage().ref()
          const fileExt = image.name.slice(image.name.lastIndexOf('.'))
          const fileRef = storageRef.child('users/' + id + '.' + fileExt)
  
          var uploadTask = fileRef.put(image)
  
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
                this.dispatch('userProfileModule/patch', { id: id, photoURL: downloadURL }) // payload needs an 'id' prop
              })
            }
          )
  
        }
        // case: we have no photo (or we deleted it in the profile view)
        else {
          // case: we have an old photoURL in the store. In this case we delete the photo from the store prior to uploading data
          if (oldPhotoURL) {
            const storageRef = Firebase.storage().ref()
            const fileExt1 = oldPhotoURL.slice(oldPhotoURL.lastIndexOf('.'))
            const fileExt = fileExt1.slice(0, fileExt1.indexOf('?'))
            const fileRef = storageRef.child('users/' + id + '.' + fileExt)
            // Delete the file
            fileRef.delete().then(function() {
              // File deleted successfully. Now we upload data
              this.dispatch('userProfileModule/patch', { id: id, photoURL: null }) // payload needs an 'id' prop
            }).catch(function(error) {
              // Uh-oh, an error occurred!
              console.log("Error on deleting file: " + 'users/' + id + '.' + fileExt)
              console.log(error)
            })
          }
        //   else {
        //     uploadData()
        //   }
        }
      },
  


    },
  }
  
  export default userProfileModule