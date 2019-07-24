<template>
  <div id="app-root">
    <router-view>
    </router-view>
   <!-- global snackbar -->
    <v-snackbar :timeout="17500" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-spacer />
        <v-btn
          v-if="snackbar.buttonAction!=null"
          flat
          @click='snackbar.buttonAction'
        >
          {{ snackbar.buttonText }}
        </v-btn>
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar> 
  </div>
</template>

<script>
//import AppEvents from "./event"
import installPrompt from './installPrompt'
export default {
  components: {
    // add components like ThemeSettings right drawer
  },
  mixins: [installPrompt],
  data() {
    return {
      snackbar: {
        show: false,
        color: "",
        text: "",
        buttonText: null,
        buttonAction: null
      },
    }
  },
  created() {
    // add app events
  },
  mounted() {
    //
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

<style scoped>
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>