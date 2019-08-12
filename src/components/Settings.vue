<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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

    </v-card>
  </v-dialog>

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
    }
  },
  computed: {
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

