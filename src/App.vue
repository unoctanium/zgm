<template>
  <div id="app-root">
    <router-view>
    </router-view>
   <!-- global snackbar -->
    <v-snackbar :timeout="5000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar> 
    <install-prompt></install-prompt>
  </div>
</template>

<script>
//import AppEvents from "./event"
import InstallPrompt from '@/components/InstallPrompt';

export default {
  components: {
    // add components like ThemeSettings right drawer
    InstallPrompt
  },
  data() {
    return {
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
    }
  },
  created() {
    // add app events
  },
  methods: {
    // add methods like ThemeSettings right drawer
  }
}
</script>

<style>
/*
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
*/

</style>
