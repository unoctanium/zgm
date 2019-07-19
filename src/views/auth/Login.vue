<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="@/assets/logo.png" alt="zgm logo" width="120" height="120" />
        <h1 class="flex my-4 primary--text">zgm</h1>
      </div>
      <v-form>
        <v-text-field
          append-icon="person"
          name="login"
          label="Login"
          type="text"
          v-model="model.username"
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="Password"
          id="password"
          type="password"
          v-model="model.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    model: {
      username: "admin@isocked.com",
      password: "password"
    }
  }),

  methods: {
    login() {
      this.loading = true
      // handle login
      setTimeout(() => {
        this.$router.push("/dashboard")
      }, 1000)
    }
  }
}
</script>
<style scoped lang="css"></style>