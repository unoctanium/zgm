<template>
  <v-toolbar _color="primary" clipped-left _fixed app dark extended extension-height="2">
    
    <v-progress-linear 
      v-if="!networkOnLine"
      slot="extension" 
      indeterminate
      class="ma-0"
      color="red"
      height="2"
    >
    </v-progress-linear>
    <v-progress-linear 
      v-else-if="loading"
      slot="extension" 
      indeterminate
      height="2"
    >
    </v-progress-linear>


    <v-toolbar-title>
      <v-toolbar-side-icon @click="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
    
    <!--
    <v-text-field flat solo-inverted prepend-inner-icon="search" label="Search" clearable class="search"></v-text-field>
    -->
    
    <v-spacer></v-spacer>
    
    <v-toolbar-items>
      <!-- FULLSCREEN BUTTON -->
      <v-btn 
        v-if="!isStandaloneApp"
        icon 
        @click="handleFullScreen()"
      >
        <v-icon>fullscreen</v-icon>
      </v-btn>

      <!-- REFRESH BUTTON -->

      <v-btn 
        icon 
        @click="handleRefresh()"
      >
        <v-icon>refresh</v-icon>
      </v-btn>

      <!-- NOTIFICATIONS BUTTON -->
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
        <!--<notification-list></notification-list>-->
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-icon class="fa-2x">person</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile
            v-for="(item, index) in items"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
// import NotificationList from "@/components/widgets/list/NotificationList"
// import InstallPrompt from '@/components/InstallPrompt'
import Util from "@/util"
import { mapState } from 'vuex'

export default {
  name: "AppToolbar",
  components: {
    // NotificationList
    // InstallPrompt
  },
  data() {
    return {
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: this.handleProfile
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: this.handleSetting
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Logout",
          click: this.handleLogut
        }
      ],
      refreshing: false,
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    isStandaloneApp() {
        if(window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone))
          return true
        else
          return false
    },
    ...mapState('app', ['loading', 'networkOnLine']),
  },
  methods: {
    handleDrawerToggle() {
      this.$emit("side-icon-click")
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
    handleRefresh() {
      if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
    },
    handleLogut() {
      //handle logout
      this.$router.replace('/auth/signout')
    },
    handleSetting() {

    },
    handleProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style>
.v-toolbar__content, 
.v-toolbar__extension {
    padding: 0 0;
}
</style>
