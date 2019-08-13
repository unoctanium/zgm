export default {
  name: 'installPrompt',
  data() {
    return {
      installEvent: null, // fired if PWA can be installed
      installedEvent: null, // fired if PWA has been installed
      refreshing: false,
      registration: null,
    };
  },
  computed: { 
  },
  created() {
    // Add Event Listener for Android: PWA install available
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.installEvent = e
      localStorage.setItem('installEvent', JSON.stringify(this.installEvent));
    })
    // Add Event Listener for ANdroid: PWA app has been installed
    window.addEventListener('appinstalled', () => {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'APP INSTALLED',
        buttonAction: null
      }
    })
    // Add Event Listener: PWA SW Update available
    document.addEventListener(
      'swUpdated', this.handleSWUpdateEvent, { once: true }
    )
    // Add Event Listener to navigator: Controllerchange to reload page and load update
    navigator.serviceWorker.addEventListener(
      'controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      }
    )
  },
  mounted() {
    if (localStorage.getItem('installEvent')) {
      this.installEvent = JSON.parse(localStorage.getItem('installEvent'))
      this.snackbar = {
        show: true,
        color: 'green',
        text: "Install as App?",
        buttonText: "INSTALL",
        buttonAction:  () => {this.handleInstallButton()}
      }
    }
  },
  methods: {
    handleInstallButton() {
      //console.log("handle install") 

      this.snackbar.show = true
      this.snackbar.text = 'handling install'
      this.snackbar.buttonText = ''
      this.snackbar.action = null

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
    },
    handleSWUpdateEvent(e) {
      this.registration = e.detail

      this.snackbar.color = 'green'
      this.snackbar.text = "New version available!"
      this.snackbar.buttonText = "REFRESH"
      this.snackbar.buttonAction = () => {this.handleRefreshButton()}
      this.snackbar.show = true
      
    },
    handleRefreshButton() {
      //console.log("handle refresh") 

      this.snackbar.show = true
      this.snackbar.text = 'handling refresh'
      this.snackbar.buttonText = ''
      this.snackbar.buttonAction = null

      if (!this.registration || !this.registration.waiting) { 
        return 
      }
      this.registration.waiting.postMessage('skipWaiting');
      
    }

  }

}