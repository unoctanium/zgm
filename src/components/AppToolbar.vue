<template>
  <v-app-bar _color="primary" clipped-left _fixed app extended extension-height="2">
    
    <!-- EXTENSION: PROGRESS AND OFFLINE INDICATORS -->
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

    <!-- DRAWER TOGGLE -->
    <v-app-bar-nav-icon @click="handleDrawerToggle"></v-app-bar-nav-icon>
    
    <!--
    <v-text-field flat solo-inverted prepend-inner-icon="search" label="Search" clearable class="search"></v-text-field>
    -->
    
    <!-- TITLE -->
    <v-toolbar-title>
        {{title}}
      </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <!-- FULLSCREEN BUTTON -->
    <v-btn 
      v-if="!isStandaloneApp"
      icon 
      @click="handleFullScreen()"
    >
      <v-icon>fullscreen</v-icon>
    </v-btn>

    <!-- REFRESH BUTTON -->
    <v-btn icon @click="handleRefresh()"
    >
      <v-icon>refresh</v-icon>
    </v-btn>

    <!-- NOTIFICATIONS BUTTON -->
    <!--
    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
      <v-btn icon text slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <notification-list></notification-list>
    </v-menu>
    -->

    <!-- PROFILE MENU -->
    <v-menu
      _left
      _bottom
      offset-y origin="center center" :nudge-bottom="8"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-icon class="fa-2x">person</v-icon>
        </v-btn>
      </template>

      <v-list>

        <v-list-item
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
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--
        <v-list-item
          v-for="n in 5"
          :key="n"
          @click="() => {}"
        >
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
        -->

      </v-list>
    </v-menu>
    <!--
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large text slot="activator">
        <v-icon class="fa-2x">person</v-icon>
      </v-btn>

      <v-list class="pa-0">

        <v-list-item
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
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-menu>
    -->


    <settings v-model="settingsdialog"></settings>
    <profile v-model="profiledialog" ></profile>
    <update-email v-model="emaildialog" ></update-email>
    <update-password v-model="passworddialog" ></update-password>



    <!--<profile v-model="profiledialog" :profileUser="profileUser"></profile>-->

  </v-app-bar>
</template>

<script>
// import NotificationList from "@/components/widgets/list/NotificationList"
// import InstallPrompt from '@/components/InstallPrompt'
import Util from "@/util"
import { mapState } from 'vuex'


import Settings from "@/components/Settings"
import Profile from "@/components/Profile"
import UpdateEmail from "@/components/UpdateEmail"
import UpdatePassword from "@/components/UpdatePassword"


export default {
  name: "AppToolbar",
  components: {
    // NotificationList
    // InstallPrompt

    Settings,
    Profile,
    UpdateEmail,
    UpdatePassword

  },
  props: {
    title: {
      type: String,
      default: ''
    },
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
          icon: "email",
          href: "#",
          title: "Change Login",
          click: this.handleLogin
        },
        {
          icon: "lock",
          href: "#",
          title: "Change Password",
          click: this.handlePassword
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: this.handleSetting
        },
        {
          icon: "power_settings_new",
          href: "#",
          title: "Logout",
          click: this.handleLogut
        }
      ],
      refreshing: false,
      settingsdialog: false,
      profiledialog: false,
      emaildialog: false,
      passworddialog: false

      //profileUser: null
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
    //...mapState('auth', ['user']),
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
      //this.$router.push('/settings')
      this.settingsdialog = true
    },
    handleProfile() {
      //this.$router.push('/profile')
      this.profiledialog = true
      //this.profileUser = this.user
    },
    handleLogin() {
      //this.$router.push('/settings')
      this.emaildialog = true
    },
    handlePassword() {
      //this.$router.push('/settings')
      this.passworddialog = true
    },
  }
}
</script>

<style>
.v-toolbar__extension {
    padding: 0 0;
}
</style>
