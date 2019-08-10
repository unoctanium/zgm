<template>
   
  <v-form
    ref="passwordForm"
    v-model="formValid"
    _lazy-validation
    @submit="closeDialog" 
    @keyup.enter.native="closeDialog"
  >
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      _scrollable
    >
      <v-card>
        <v-toolbar>
          <v-btn icon @click="cancelDialog()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Change Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
              text 
              @click="closeDialog()" 
              type="submit"
              :disabled = "!networkOnLine || !formValid"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
       
        <!-- Error-Message -->
        <!--<p v-if="errorMessage">{{ errorMessage }}</p>-->

        <v-card-text>
          <v-text-field
            v-model="oldPassword"
            name="oldPassword"
            label="Old Password"
            id="oldPassword"
            autocomplete="password"
            :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            :type="passwordVisible ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            required
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            name="mewPassword"
            label="New Password"
            id="newPassword"
            autocomplete="password"
            :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            :type="passwordVisible ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            required
          ></v-text-field>
          <v-text-field 
            v-model="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            autocomplete="password"
            :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            :type="passwordVisible ? 'text' : 'password'"
            :rules="[rules.required, rules.comparePasswords]"
          ></v-text-field>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-form>
</template>


<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "UpdateEmail",
  props: {
    value: Boolean
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      formValid: true,
      passwordVisible: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        comparePasswords: (v) => v==this.newPassword || "Passwords do not mactch"
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
    ...mapState('userProfileModule', ['user']),
    ...mapState('app', ['networkOnLine']),
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
  mounted: function() {
  },
  methods: {

    ...mapActions('auth', [
      'updatePassword'
    ]),

    initDialog() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },

    cancelDialog() {
      this.dialog = false
      this.initDialog()
    },

    closeDialog() {
      this.dialog = false
    },

    /*
    async closePasswordDialog() {
      this.updatePassword( { payload: this.changedPassword} )
      .then(
        this.passwordDialog = false
      )
      .catch( (error) => {
        alert(error)
      })
    },
    */

  }
}
</script>
