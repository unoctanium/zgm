import Vue from 'vue'
import Vuetify from 'vuetify'
//import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/es5/util/colors'
//import "./default.styl"


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    //dark: true,
    //themes: {
      /*
      light: {
        primary: '#3F51B5',
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"        

      },
      dark: {
        primary: '#2196F3'
      },
      */
    //},
  },
  customProperties: true
})

