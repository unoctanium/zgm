
<template>
  <div>
    <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
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
                  v-if="photoURL != ''"
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

          <v-list-item>
            <v-btn
              block
              color="primary"
              @click="changedEmail=email; emailDialog=true"
            >
            Change E-Mail
           </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              block
              color="primary"
              @click="changedPassword=''; confirmPassword=''; passwordDialog=true"
            >
            Change Password
           </v-btn>
          </v-list-item>

        </v-list>
        <v-divider></v-divider>

      </v-card>
    </v-dialog>
    </v-form>

    <!-- EDIT EMAIL DIALOG -->
    
    <v-form
      ref="emailForm"
      v-model="emailFormValid"
      lazy-validation
    >
    <v-dialog
      v-model="emailDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      _scrollable
    >
      <v-card>
        <v-toolbar>
          <v-btn icon @click="emailDialog=false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Change E-Mail</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
              text 
              @click="closeEmailDialog()" 
              :disabled="!emailFormValid"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="changedEmail"
                :rules="[rules.inputRequired, rules.emailFormat]"
                counter="20"
                label="New E-Mail"
                prepend-icon="email"
                clearable
                required
                type="email"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    </v-form>


    <!-- EDIT PASSWORD DIALOG -->
    
    <v-form
      ref="passwordForm"
      v-model="passwordFormValid"
      lazy-validation
    >
    <v-dialog
      v-model="passwordDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      _scrollable
    >
      <v-card>
        <v-toolbar>
          <v-btn icon @click="passwordDialog=false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Change Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
              text 
              @click="closePasswordDialog()" 
              :disabled="!passwordFormValid"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="changedPassword"
                :rules="[rules.inputRequired, comparePasswords]"
                counter="20"
                label="New Password"
                prepend-icon="password"
                clearable
                required
                type="password"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="confirmPassword"
                _rules=newPasswordRules
                counter="20"
                label="Confirm Password"
                prepend-icon="password"
                clearable
                _required
                type="password"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    </v-form>


  </div>
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
      photoURL: '',
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
    ...mapState('auth', [
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
  created() {
    this.initDialog()
  },
  methods: {

    ...mapActions('auth', [
      'updateProfile', 'updateEmail', 'updatePassword'
    ]),

    initDialog() {
      this.email = this.user.email
      this.displayName = this.user.displayName
      this.photoURL = this.user.photoURL
      this.phone = this.user.phone,
      this.userLevel= this.user.userLevel
    },

    cancelDialog() {
      this.dialog = false
      //console.log("CANCEL")
      this.initDialog()
    },

    async closeDialog() {
      this.dialog = false
      const clonedData = {
        id : this.user.id,
        email: this.email,
        displayName: this.displayName,
        phone: this.phone,
        userLevel: this.user.userLevel
      }
      await this.updateProfile( { data: clonedData, image: this.profileImage, oldPhotoURL: this.user.photoURL } )
    },

    onPickFile() {
      this.$refs.fileInput.click()
    },

    onDeleteFile() {
      this.photoURL = ''
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

    
    closeEmailDialog() {
      var error = this.updateEmail( { payload: this.changedEmail } )
        if(!error) {
          console.log("1")
          console.log(error)
          this.emailDialog = false
          this.email = this.changedEmail
        }
        else {
          console.log("2")
          console.log(error)
          alert(error)
        }
      /*
      .then( (error) => {
        if(!error) {
          console.log("1")
          console.log(error)
          this.emailDialog = false
          this.email = this.changedEmail
        }
        else {
          console.log("2")
          console.log(error)
          alert(error)
        }
      })
      */
    },

    async closePasswordDialog() {
      this.updatePassword( { payload: this.changedPassword} )
      .then(
        this.passwordDialog = false
      )
      .catch( (error) => {
        alert(error)
      })
    },
      
  }

}
</script>

<style (scoped)>
</style>
