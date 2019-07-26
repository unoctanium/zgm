<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">zgm</h1>
      </div>
      <v-form @submit.prevent="onSignup">
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
            color="primary" type="submit"
            :loading="loading"
          >
            Sign up
            <!--<span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>-->
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      this.$router.push('/auth/profile')
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  }
}
</script>