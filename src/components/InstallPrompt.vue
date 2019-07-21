<template>
  <!--<v-alert
    _v-if="showInstallBanner"
    _v-model="alert"
    value="true"
    dismissible
    type="info"
  >
    Do you want to <a href="#" @click.prevent="install">add this app to your home screen?</a>
  </v-alert>
  -->

  <v-dialog
    v-if="showInstallBanner"
    width="500"
    value="true"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Install as app
      </v-card-title>

      <v-card-text>
        Do you want to <a href="#" @click.prevent="install">add this app to your home screen?</a>
      </v-card-text>

      <v-divider></v-divider>

      <!--
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          I accept
        </v-btn>
      </v-card-actions>
      -->

    </v-card>
  </v-dialog>

</template>

<script>

let installEvent;
export default {
  name: 'installPrompt',
  data() {
    return {
      showInstallBanner: false
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }
  }
};
</script>
