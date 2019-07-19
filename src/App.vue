<template>
  <div id="app-root">
    <router-view>
    </router-view>
   <!-- global snackbar -->
    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
//import AppEvents from "./event"

export default {
  components: {
    // add components like ThemeSettings right drawer
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
