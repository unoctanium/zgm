
<template>
  <v-form
    ref="form"
    v-model="formValid"
    _lazy-validation
  >
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" _scrollable>

      <v-card>
        <v-toolbar>
          <v-btn icon @click="cancelDialog()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

            <v-btn 
              text 
              @click="closeDialog()" 
              :disabled="!formValid"
            >
              Save
            </v-btn>

          </v-toolbar-items>
        </v-toolbar>

        <v-list>
          <v-subheader>Profile Picture</v-subheader>
          <v-list-item>
            <v-container>

              <v-layout justify-center>
                <v-img
                  v-if="photoURL != null"
                  :src="photoURL"
                  width="250"
                  max-width="250"
                >
                </v-img>
                <v-img
                  v-else
                  :src="require('@/assets/default-avatar.jpg')"
                  width="250"
                  max-width="250"
                >
                </v-img>

              </v-layout>
            </v-container>
          </v-list-item>        

          <v-list-item>
            <v-layout align-center justify-center row fill-height>

              <v-btn 
                _raised 
                _class="primary" 
                icon
                @click="onPickFile"
              ><v-icon>cloud_upload</v-icon>
              </v-btn>

              <v-btn 
                _raised 
                _class="primary" 
                icon
                @click="onDeleteFile"
              ><v-icon>delete</v-icon>
              </v-btn>
                
              <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked"
              >

            </v-layout>
          </v-list-item>
        </v-list>

        <v-list>
          <v-subheader>Profile data</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="displayName"
                :rules="[rules.inputRequired]"
                counter="20"
                label="Display Name"
                prepend-icon="person"
                clearable
                _required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="phone"
                :rules="[rules.max20]"
                counter="20"
                label="Phone"
                prepend-icon="phone"
                clearable
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>


        </v-list>
        <v-divider></v-divider>

        <v-list _id="input-usage">
          <v-subheader>Account Data</v-subheader>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mail</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>E-Mail: {{email}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>verified_user</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>User-Level: {{userLevel}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Profile",
  components: {
  },
  props: {
    value: Boolean,
  },
  data () {
    return {
      formValid: true,
      emailFormValid: false,
      passwordFormValid: false,
      photoURL: null,
      profileImage: null,
      email: '', 
      displayName: '', 
      phone: '',
      userLevel: '',
      password: '',
      emailDialog: false,
      passwordDialog: false,
      changedEmail: '',
      changedPassword: '',
      confirmPassword: '',
      rules: {
        inputRequired: (v) => !!v || "The input is required",
        emailFormat: (v) => /.+@.+/.test(v) || "Input must be valid E-Mail",
        max20: (v) => v && v.length <= 20 || 'The Input must be less than 20 characters',
        min6: (v) => v && v.length >= 6 || 'The Input must be at least 6 characters'
      },
      /*
      displayNameRules: [
        (v) => !!v || "The input is required",
        //(v) => v && v.length <= 20 || 'The Input must be less than 20 characters'
      ],
      phoneRules: [ (v) => v && v.length <= 20 || 'The Input must be less than 20 characters' ],
      newEmailRules: [
        (v) => !!v || "The Input is required",
        (v) => /.+@.+/.test(v) || "Input must be valid E-Mail"
      ],
      */
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    ...mapState('userProfileModule', [
      'user'
    ]),

    comparePasswords() {
      return (this.changedPassword !== this.confirmPassword ? "Passwords don't match" : '' )
    }
    /*
    newPasswordRules() {
      return (
      [
        (v) => !!v || 'This input is required',
        (v) => v && v.length >= 8 || 'The Input must be at least characters',
        (v) => (v == this.confirmPassword) || "Passwords don't match",
      ] )
    },*/
   

  },
  watch: {
    user: {
      handler(user) {
        if (user.id!=undefined) {
          this.initDialog()
        }
      },
      immediate: true
    },
    value: function (newVal, oldVal) {
      if (newVal && !oldVal)
        this.initDialog()
    }
  },
  mounted() {
    //this.initDialog()
  },
  methods: {

    ...mapActions('userProfileModule', [
      'updateUserProfile'
    ]),
    
    initDialog() {
      console.log(this.user)
      this.email = this.user.email
      this.displayName = this.user.displayName
      this.photoURL = this.user.photoURL
      this.phone = this.user.phone,
      this.userLevel= this.user.userLevel
      this.profileImage = null
    },

    cancelDialog() {
      this.dialog = false
      //console.log("CANCEL")
      this.initDialog()
    },

    closeDialog() {
      this.dialog = false
      const clonedData = {
        id : this.user.id,
        email: this.email,
        displayName: this.displayName,
        phone: this.phone,
        //userLevel: this.user.userLevel
      }
        //dispatch('moduleName/patch', {status: 'awesome'})
      //this.patch(clonedData)
      const imageData = {
        oldPhotoURL: this.user.photoURL,
        newPhotoURL: this.photoURL,
        newImage: this.profileImage
      }
      this.updateUserProfile( { data: clonedData, image: imageData } )
      this.profileImage = null
    },

    onPickFile() {
      this.$refs.fileInput.click()
    },

    onDeleteFile() {
      this.photoURL = null
      this.profileImage = null
    },

    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert ('Please enter a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.photoURL = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.profileImage = files[0]
    },


      
  }
}
</script>

<style (scoped)>
</style>
