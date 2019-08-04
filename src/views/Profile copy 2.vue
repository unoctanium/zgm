
<template>

  <v-layout justify-center>
    <v-dialog v-model="editing" fullscreen hide-overlay transition="dialog-bottom-transition">

      <!-- NON-EDIT MODE: SHOW PROFILE -->
      <template v-slot:activator="{ on }">

        <v-card
          max-width="375"
          class="mx-auto"
        >
          <v-card-title>
            <div class="display-1" v-show="user.isAdmin">ADMIN</div>
            <v-spacer></v-spacer>
            
            <v-btn icon v-on="on" _class="mr-4" @click="onStartEdit()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-title>

          <v-img
            v-if="user.photoURL"
            :src="user.photoURL"
            width="375"
            dark
          >
          </v-img>
          <v-img
            v-else
            :src="require('@/assets/default-avatar.jpg')"
            width="375"
            dark
          >
          </v-img>

          <v-list two-line>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ (user.displayName ? user.displayName : 'unknown' ) }} </v-list-item-title>
                <v-list-item-subtitle>Display Name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">mail</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.email ? user.email : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>E-mail</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>chat</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.phone ? user.phone : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>Phone</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>chat</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.userLevel ? user.userLevel : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>User Level</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>
        </v-card>

      </template>

      <!-- EDIT MODE: SHOW DIALOG -->
      <v-card>
        <v-toolbar>
          <v-btn icon @click="onCancelEdit()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit User Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="onCloseEdit()" :disabled="!formValid">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
        <!--<v-form v-model="formValid">-->

          <v-list>
            <v-subheader>Login data</v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mail</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-text-field
                  v-model="updatedUser.email"
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
                  v-model="updatedUser.password"
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
                  v-model="updatedUser.confirmPassword"
                  type="password"
                  _rules="[comparePasswords]"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

          </v-list>
          <v-divider></v-divider>



          <v-list>
            <v-subheader>Account data</v-subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-text-field
                  v-model="updatedUser.displayName"
                  _rules="nameRules"
                  counter="20"
                  label="Display Name"
                  _required
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <!--- ... -->

          </v-list>
          <v-divider></v-divider>


        <!--</v-form>-->
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      editing: false,
      formValid: false,
      updatedUser: 
      {
        photoURL: null,
        displayName: null,
        email: null,
        phone: null,
        userLevel: null,
        password: null,
        confirmPassword: null
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      nameRules: [
        v => !!v || 'Display Name is required',
        v => v.length <= 20 || 'Display Name must be less than 20 characters',
    ],
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    comparePasswords () {
      return this.updatedUser.password !== this.updatedUser.confirmPassword ? 'Passwords do not match' : true
    }
    //profileImage() { return this.photoURL ? this.photoURL : '@/assets/default-avatar.jpg' }

  },
  mounted: function() {
    
    console.log("@/profile: mounted. user:")
    console.log(this.user)
  },
  methods: {
    ...mapActions('auth', ['update']),
    
    onCloseEdit () {
      this.editing = false
      // HERE ODO: SAVE to firebase
      // and if email or password changed: password make own method from subdialog. email: save to auth db as well here if email != updatedemai
    },
    onCancelEdit () {
      this.editing = false
      
      this.updatedUser.photoURL = null
      this.updatedUser.displayName = null
      this.updatedUser.email = null
      this.updatedUser.phone = null
      this.updatedUser.userLevel = null
      this.updatedUser.password = null
      this.updatedUser.confirmPassword = null

    },

    onStartEdit () {
      //this.editing = true
      this.updatedUser.photoURL = this.user.photoURL || ''
      this.updatedUser.displayName = this.user.displayName  || ''
      this.updatedUser.email = this.user.email  || ''
      this.updatedUser.phone = this.user.phone  || ''
      this.updatedUser.userLevel = this.user.userLevel  || ''
      this.updatedUser.password = ''
      this.updatedUser.confirmPassword = ''
    },

    
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        alert('Please add a valid image (.jpg, .png, .gif)')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
    
  }
}
</script>
