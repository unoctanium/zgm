module.exports = {
    devServer: {
        host: '0.0.0.0',
        allowedHosts: ['localhost', '.gitpod.io'],
    },
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
