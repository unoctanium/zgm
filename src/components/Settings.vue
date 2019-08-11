<template>

  <!--<v-layout justify-center>-->
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <!--<template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card>
        <v-toolbar extension-height="2">

          <v-progress-linear 
            v-if="!networkOnLine"
            slot="extension" 
            indeterminate
            class="ma-0"
            color="red"
            height="2"
          ></v-progress-linear>

          <v-btn icon @click="cancelDialog()">
            <v-icon>close</v-icon>
          </v-btn>

          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="closeDialog()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list subheader>
          <v-subheader>App Settings</v-subheader>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="darkMode" @change="onDarkModeUpdate()"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dark Mode</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="showMenu"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Menu allways visible</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>


<!--
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
-->


      </v-card>
    </v-dialog>
  <!--</v-layout>-->
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "Settings",
  components: {
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      
      darkMode: false,
      showMenu: false,

      //notifications: null,
      //sound: null,
      //widgets: null
    }
  },
  computed: {
//    ...mapState('app', [
//      'darkMode'
//    ]),
//    profileImage() { return this.photoURL ? this.photoURL : '@/assets/default-avatar.jpg' }
    dialog: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    ...mapState('userProfileModule', [
      'user'
    ]),
    ...mapState('app', [
      'networkOnLine'
    ]),
  },
  watch: {
    
    user: {
      handler(user) {
        if (user.id!=undefined) {
          this.initDialog()
        }
      },
      immediate: true
    },
    
    value: function (newVal, oldVal) {
      if (newVal && !oldVal)
        this.initDialog()
    }
  },

  methods: {
    
    ...mapActions('userProfileModule', ['updateUserData']),

    initDialog() {
      this.darkMode = this.user.settings.darkMode || false
      this.showMenu = this.user.settings.showMenu || false
    },

    closeDialog() {
      this.dialog = false
      const patchData = {
        settings: {
          darkMode: this.darkMode,
          showMenu: this.showMenu
        } 
      }
      this.updateUserData( { data: patchData } )
    },

    cancelDialog() {
      this.$vuetify.theme.dark = this.user.settings.darkMode || false
      this.dialog = false
    },

    onDarkModeUpdate() {
      this.$vuetify.theme.dark = this.darkMode
    }

  }
}
</script>

