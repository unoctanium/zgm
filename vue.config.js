module.exports = {
    pwa: {
        name: "zgm",
        themeColor: '#3F51B5',
        workboxPluginMode: "InjectManifest",
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            swSrc: "src/util/service-worker.js",
            swDest: 'service-worker.js',
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        }
    }
}
