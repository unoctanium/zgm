<template>
  <div>
    <span>Logged out</span>
    <v-btn color="primary" @click="goHome()">Go Home</v-btn>
  </div> 
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['signOut']),
  },
  async mounted () {
    this.signOut ()
    this.$vuetify.theme.dark = false
    
    
  },
  goHome() {
    this.signOut ()
    this.$vuetify.theme.dark = false
    window.location.reload();
    this.$router.push({ path: "/" })
  }
}
</script>