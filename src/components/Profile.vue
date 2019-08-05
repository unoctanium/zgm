
<template>
  <div>
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
                _rules="nameRules"
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
                _rules="phoneRules"
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

    <!-- EDIT EMAIL DIALOG -->
    
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
                _rules="newEmailRules"
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


    <!-- EDIT PASSWORD DIALOG -->
    
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
                _rules="newPasswordRules"
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
                _rules="[comparePasswords]"
                counter="20"
                label="Confirm Password"
                prepend-icon="password"
                clearable
                required
                type="password"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>


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
      emailFormValid: true,
      passwordFormValid: true,
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
      confirmPassword: ''
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
   

  },
  created() {
    this.initDialog()
  },
  methods: {

    ...mapActions('auth', [
      'update'
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

    closeDialog() {
      this.dialog = false
      const clonedData = {
        id : this.user.id,
        email: this.email,
        displayName: this.displayName,
        phone: this.phone,
        userLevel: this.user.userLevel
      }
      this.update( { data: clonedData, image: this.profileImage, oldPhotoURL: this.user.photoURL, newPassword: this.password } )
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
      
    },

    closePasswordDialog() {
      alert("JO")
    }
      
  }

}
</script>

<style (scoped)>
</style>
