<template>
  <v-form
    ref="emailForm"
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
          <v-toolbar-title>Change E-Mail</v-toolbar-title>
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

        <!-- Progress Overlay -->
        <v-overlay :value="progressOverlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>


        <v-card-text>

          <span>
            Current E-Mail: {{ currentEmail }}
          </span>
          
          <v-text-field
            append-icon="person"
            name="newEmail"
            label="New E-Mail"
            id="newEmail"
            v-model="newEmail"
            type="email"
            autocomplete="email"
            :rules="[rules.required, rules.emailFormat]"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            name="password"
            label="Confirm with Password"
            id="password"
            autocomplete="password"
            :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            :type="passwordVisible ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            required
            @click:append="passwordVisible = !passwordVisible"
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
      currentEmail: '',
      newEmail: '',
      password: '',
      formValid: true,
      passwordVisible: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailFormat: (v) => /.+@.+/.test(v) || "Input must be valid E-Mail",
      },
      progressOverlay: false
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
      'updateEmail'
    ]),

    initDialog() {
      this.currentEmail = this.user.email
      this.newEmail = ''
      this.password = ''
    },

    cancelDialog() {
      this.dialog = false
      this.initDialog()
    },

    closeDialog() {
      this.progressOverlay = true
      this.updateEmail( { currentEmail: this.currentEmail, newEmail: this.newEmail, currentPassword: this.password })
      this.progressOverlay = false
      this.dialog = false
    },    
  }
}
</script>
