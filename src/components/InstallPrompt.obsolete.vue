<template>
  <div></div>
</template>

<script>
/*
export default {
  name: 'installPrompt',
  data() {
    return {
      installEvent: null,
      installedEvent: null
    };
  },
  computed: { 
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.installEvent = e
      localStorage.setItem('installEvent', JSON.stringify(this.installEvent));
    });
    window.addEventListener('appinstalled', () => {
      this.$snackbar = {
        show: true,
        color: 'green',
        text: 'APP INSTALLED',
        timeout: 5000
      }
    });
  },
  mounted() {
    if (localStorage.getItem('installEvent')) {
      this.installEvent = JSON.parse(localStorage.getItem('installEvent'))
      this.$snackbar = {
        show: true,
        color: 'green',
        text: '<a :href="handleInstallButton"> INSTALL AS APP </a>',
        timeout: 10000
      }
    }
  },
  methods: {
    handleInstallButton() {
      this.$snackbar = {
        show: false,
        color: 'green',
        text: '',
        timeout: 5000
      }
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // console.log('User accepted the A2HS prompt');
          this.installEvent = null
          localStorage.removeItem('installEvent')
        } 
        else {
          // console.log('User dismissed the A2HS prompt');
        }

      })
    }
  }

}
*/
</script>



