module.exports = {
    pwa: {
        themeColor: '#3F51B5',
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js"
        }
    }
}
