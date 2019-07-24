import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/es5/util/colors'
import "./default.styl"

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: "#3F51B5", // colors.indigo.base // ! if change: Also change theme-color in index.html (template-color) 
/*    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
*/
  },
  dark: true,
  customProperties: true
})
