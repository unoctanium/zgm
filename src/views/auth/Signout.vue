<template>
  <div>Logged out</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['signOut']),
  },
  async mounted () {
    await this.signOut ()
  }
}
</script>