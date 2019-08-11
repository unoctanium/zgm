// Update the version number for a new production build !!!
// version: '0.1.0'
// Also update version in .env.production

// install new service worker when ok, then reload page.
self.addEventListener("message", msg=>{
    if (!msg.data) {
        return
    }
    switch (msg.data) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        default:
            // NOOP
            break;
    }

    /*if (msg.data.action=='skipWaiting'){
        self.skipWaiting()
    }*/
})

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line
workbox.precaching.suppressWarnings();
// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

