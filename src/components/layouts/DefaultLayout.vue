<template>
  <v-app id="inspire" class="app dashboard" _style="background: #3F51B5">

    <app-drawer class="app--drawer" :showDrawer.sync="showDrawer"></app-drawer>
    <app-toolbar class="app--toolbar" :title="$route.meta.title" @side-icon-click="handleDrawerVisiable"></app-toolbar>
    <v-content>
      
      <!-- Page Header -->
      <!--<page-header></page-header>-->

      <!-- Progress Overlay -->
      <v-overlay :value="progressOverlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <div class="page-wrapper">
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="_white pa-3 app--footer">
        <span class="caption">zengastro &copy; uncoctanium {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <span class="caption mr-1">V: {{ appVersion }}</span>
        <!--<v-spacer></v-spacer>
        <span class="caption mr-1"> Make With Love </span>
        <v-icon color="pink" small>favorite</v-icon>-->
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer"
import AppToolbar from "@/components/AppToolbar"
import AppFab from "@/components/AppFab"
//import PageHeader from "@/components/PageHeader"

import { mapState } from 'vuex'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    //PageHeader
  },
  data() {
    return {
      showDrawer: false,
      progressOverlay: true
    }
  },
  computed: {
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle', 'appVersion']), 
    ...mapState('userProfileModule', ['user']),
  },
  
  watch: {
    user: {
      handler(user) {
        if (user && user.id!=undefined) {
          this.initLayout();
        }
      },
      immediate: true
    },
  },
  
  methods: {

    initLayout() {
      this.progressOverlay = false
      this.$vuetify.theme.dark = this.$store.state.userProfileModule.user.settings.darkMode
    },

    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer
    }

  },
  created() {}
}
</script>

<style>
.page-wrapper {
  min-height: calc(100vh - 100px);  
  padding: 10px;
}
</style>