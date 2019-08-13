<template>

  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">{{ appShortTitle }}</h1>
        <div class="caption">{{ appVersion }}</div>
      </div>
      
      <!-- Offline instruction -->
      <div v-show="!networkOnLine" data-test="offline-instruction">
        Please check your connection, login feature is not available offline.
      </div>

      <!-- Login Error -->
      <p v-if="authError">{{ authError }}</p>

      <v-form _lazy-validation v-model="formValid" ref="signinForm" @submit="onSignin">
        
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
      passwordVisible: false,
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailFormat: (v) => /.+@.+/.test(v) || "Input must be valid E-Mail",
      },
    }
  },
  computed: {
    ...mapState('auth', ['user', 'authError']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle', 'appVersion']),
     
    nextRoute () {
      return this.$route.query.redirectUrl || '/'
    }
  },
  mounted() {
    this.resetError()
    if (this.userId!=null && this.userId!=undefined) {
      const redirectUrl = (this.$route.query.redirectUrl == null)
        ? '/dashboard'
        : this.$route.query.redirectUrl
      this.$router.push(redirectUrl)
    }
  },
  watch: {
    user: {
      handler(user) {
        if (user!=undefined) {
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
      //this.$refs.signinForm.validate()
      this.signIn ( { email:this.email, password:this.password })
    }

  }
}

</script>
