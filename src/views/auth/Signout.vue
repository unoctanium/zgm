<template>
  <div>
    <span>Logged out</span>
    <v-btn color="primary" @click="goHome">Go Home</v-btn>
  </div> 
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['signOut']),
  },
  async mounted () {
    await this.signOut ()
  },
  goHome() {
      this.$router.push({ path: "/" })
  }
}
</script>