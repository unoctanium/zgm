<template>

  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">{{ appShortTitle }}</h1>
      </div>
      
      <!-- Loader -->
      <div v-show="userId === undefined">Authenticating...</div>

      <!-- Offline instruction -->
      <div v-show="!networkOnLine" data-test="offline-instruction">
        Please check your connection, login feature is not available offline.
      </div>

      <!-- Login Error -->
      <p v-if="authError">{{ authError }}</p>

      <v-form lazy-validation @submit="onSignin" @keyup.enter.native="onSignin">
        
        <v-text-field
          append-icon="person"
          name="email"
          label="Mail"
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          :rules="[rules.required, rules.emailFormat]"
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
          @click:append="passwordVisible = !passwordVisible"
        ></v-text-field>
        <div class="login-btn">
          <v-spacer></v-spacer>
          <v-btn 
            block 
            color="primary" 
            type="submit"
            :disabled = "!networkOnLine || !formValid"
          >
            Login
            <!--<span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>-->
          </v-btn>
          <v-btn
            text 
            to="/auth/signup"
          >
            Sign up new account
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
      formValid: true,
      passwordVisible: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailFormat: (v) => /.+@.+/.test(v) || "Input must be valid E-Mail",
      },
      // userId: null,
      // authError: null,
      // networkOnLine: null,
      // appTitle: null,
      // appShortTitle: null
    }
  },
  computed: {
    ...mapState('auth', ['userId', 'authError']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
 
    nextRoute () {
      return this.$route.query.redirectUrl || '/'
    }
  },
  mounted() {
    this.resetError()
  },
  watch: {
    userId: {
      handler(userId) {
        if (userId!=null && userId!=undefined) {
          const redirectUrl = (this.$route.query.redirectUrl == null)
            ? '/dashboard'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('auth', ['signIn', 'resetError']),
    
    onSignin(event) {
      event.preventDefault()
      event.stopPropagation()
      this.signIn ( { email:this.email, password:this.password })
    }

  }
}

</script>
