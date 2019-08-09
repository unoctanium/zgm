import store from '@/store'

store.dispatch('app/setNetworkOnline', navigator.onLine)

window.addEventListener('online', () =>
  store.dispatch('app/setNetworkOnline', true)
)

window.addEventListener('offline', () =>
  store.dispatch('app/setNetworkOnline', false)
)
