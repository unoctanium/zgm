
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
              v-if="user!=null && user.photoURL!=null"
              :src="user.photoURL"
              width="375"
              max-width="375"
            >
            </v-img>
            <v-img
              v-else
              :src="require('@/assets/default-avatar.jpg')"
              width="375"
              max-width="375"
            >
            </v-img>
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
                v-model="updatedUser.displayName"
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
                v-model="updatedUser.phone"
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

        <!-- ODO Show User Role, Show IsAdmin -->
        <!-- Realize: Photo Download, Upload and Update -->
        <!-- Realize: change email, chanhge password -->


      </v-card>
    </v-dialog>
  
</template>


<script>
import {mapState, mapActions} from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  name: "Profile",
  components: {
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      formValid: true,
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
  mounted: function() {
    this.updatedUser.photoURL = this.user.photoURL || ''
    this.updatedUser.displayName = this.user.displayName  || ''
    this.updatedUser.email = this.user.email  || ''
    this.updatedUser.phone = this.user.phone  || ''
    this.updatedUser.userLevel = this.user.userLevel  || ''
    this.updatedUser.password = ''
    this.updatedUser.confirmPassword = ''
    console.log(this.user)
  },
  methods: {

    ...mapActions('auth', [
      'update'
    ]),

    cancelDialog() {
      this.dialog = false
    },

    closeDialog() {
      this.dialog = false
      var clonedData = cloneDeep(this.user)
      clonedData.photoURL = this.updatedUser.photoURL
      clonedData.displayName = this.updatedUser.displayName
      clonedData.email = this.updatedUser.email
      clonedData.phone = this.updatedUser.phone
      this.update( { data: clonedData } )
    },

  }
}
</script>

