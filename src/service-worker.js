// Update the version number for a new production build !!!
// version: '0.0.9'
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
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

