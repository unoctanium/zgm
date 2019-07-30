<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">{{ appShortTitle}}</h1>
      </div>

      <!-- Loader -->
      <div v-show="user === undefined">Authenticating...</div>

      <!-- Offline instruction -->
      <div v-show="!networkOnLine" data-test="offline-instruction">
        Please check your connection, login feature is not available offline.
      </div>

      <!-- Login Error -->
      <p v-if="authError">{{ authError }}</p>

      <v-form lazy-validation  @submit="onSignup" @keyup.enter.native="onSignup">
        
        <v-text-field
          append-icon="person"
          name="email"
          label="Mail"
          id="email"
          v-model="email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="Password"
          id="password"
          v-model="password"
          type="password"
          required
        ></v-text-field>
        <v-text-field 
          name="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          :rules="[comparePasswords]">
        </v-text-field>
        <div class="login-btn">
          <v-spacer></v-spacer>
          <v-btn 
            block 
            color="primary" 
            type="submit"
            :disabled = "!networkOnLine"
          >
            Sign up
            <!--<span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>-->
          </v-btn>
          <v-btn
            flat 
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
    }
  },
  computed: {
    ...mapState('auth', ['user', 'authError']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  },
  mounted() {
    this.resetError()
  },
  watch: {
    user: {
      handler(user) {
        if (user!=null) {
          this.$router.push('/profile')
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('auth', ['signUp', 'resetError']),
    
    async onSignup(event) {
      event.preventDefault()
      await this.signUp ( { email:this.email, password:this.password })
    }

  }
}

</script>
