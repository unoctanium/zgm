<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">{{ appShortTitle}}</h1>
      </div>

      <!-- Loader -->
      <!--<div v-show="user === undefined">Authenticating...</div>-->

      <!-- Offline instruction -->
      <div v-show="!networkOnLine" data-test="offline-instruction">
        Please check your connection, login feature is not available offline.
      </div>

      <!-- Login Error -->
      <p v-if="authError">{{ authError }}</p>

      <v-form _lazy-validation  v-model="formValid" @submit="onSignup" @keyup.enter.native="onSignup">
        
        <v-text-field
          append-icon="person"
          name="email"
          label="Mail"
          id="email"
          autocomplete="email"
          :rules="[rules.required, rules.emailFormat]"
          v-model="email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          name="password"
          label="Password"
          id="password"
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
        <div class="login-btn">
          <v-spacer></v-spacer>
          <v-btn 
            block 
            color="primary" 
            type="submit"
            :disabled = "!networkOnLine || !formValid"
          >
            Sign up
            <!--<span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>-->
          </v-btn>
          <v-btn
            text 
            to="/auth/signin"
          >
            Login with existing account
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailFormat: (v) => /.+@.+/.test(v) || "Input must be valid E-Mail",
        comparePasswords: (v) => v==this.password || "Passwords do not mactch"
      },
    }
  },
  computed: {
    ...mapState('auth', ['userId', 'authError']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    // comparePasswords () {
    //   return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    // }
  },
  mounted() {
    this.resetError()
  },
  watch: {
    userId: {
      handler(userId) {
        if (userId!=undefined) {
          this.$router.push('/')
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('auth', ['signUp', 'resetError']),
    
    onSignup(event) {
      event.preventDefault()
      this.signUp ( { email:this.email, password:this.password })
    }

  }
}

</script>
