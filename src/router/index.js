import Vue from "vue"
import Router from "vue-router"
import { routes } from "./config"
import NProgress from "nprogress"
import store from '@/store'
import "nprogress/nprogress.css"

Vue.use(Router)
const router = new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: routes
})
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.authRequired)) {
    console.log("router: user is:")
    console.log(store.state.auth.user)
    if (!(store.state.auth.user)) {
      console.log("yo")
      next({
        path: '/auth/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

