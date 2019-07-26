<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">zgm</h1>
      </div>
      <v-form @submit.prevent="onSignin">
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
        <div class="login-btn">
          <v-spacer></v-spacer>
          <v-btn 
            block 
            color="primary" type="submit"
            :loading="loading"
          >
            Login
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
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user']),
    nextRoute () {
      return this.$route.query.redirect || '/'
    }
  },
  data () {
    return {
      loading: false,
      email: '',
      password: '',
      auth: null
    }
  },
  watch: {
    user (auth) {
      if(auth){
        this.$router.replace(this.nextRoute)
      }
    }
  },
  methods: {
    async onSignin () {
      const auth = await this.$auth.login(this.email, this.password)
      this.auth = auth
    }
  }
}
</script>
