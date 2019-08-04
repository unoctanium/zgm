
<template>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

      <v-card>
        <v-toolbar>
          <v-btn icon @click="cancelDialog()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

           

            <v-btn text @click="closeDialog()" :disabled="!formValid">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

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

            
            <v-btn 
              _raised 
              _class="primary" 
              icon
              @click="onPickFile"
            >
              <v-icon>cloud_upload</v-icon>
              
            </v-btn>

            <v-btn 
              _raised 
              _class="primary" 
              icon
              @click="onDeleteFile"
            >
              <v-icon>delete</v-icon>
              
            </v-btn>
            
            <input 
              type="file" 
              style="display: none" 
              ref="fileInput" 
              accept="image/*"
              @change="onFilePicked"
            >


          </v-layout>
          
        </v-container>


        <v-list>
          <v-subheader>Account data</v-subheader>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">person</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                v-model="displayName"
                _rules="nameRules"
                counter="20"
                label="Display Name"
                _required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                v-model="phone"
                _rules="phoneRules"
                counter="20"
                label="Phone"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <!--- ... -->

        </v-list>
        <v-divider></v-divider>




        <v-list>
          <v-subheader>Login data</v-subheader>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">mail</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                v-model="email"
                _rules="emailRules"
                label="E-mail"
                _required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">lock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                name="password"
                label="Password"
                v-model="password"
                type="password"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">lock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                v-model="confirmPassword"
                type="password"
                _rules="[comparePasswords]"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

        </v-list>
        <v-divider></v-divider>

        <!-- ODO Show User Role, Show IsAdmin -->
        <!-- Realize: Photo Download, Upload and Update -->
        <!-- Realize: change email, chanhge password -->


      </v-card>
    </v-dialog>
  
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
      email: '', 
      displayName: '', 
      photoURL: '',
      profileImage: null,
      phone: '',
      password: '',
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
      this.phone = this.user.phone
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
        userLevel: this.user.userLevel,
        isAdmin: this.user.isAdmin
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
    }

      
  }

}
</script>

