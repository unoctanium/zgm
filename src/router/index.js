import Vue from "vue"
import Router from "vue-router"
import { routes } from "./config"
import NProgress from "nprogress"
import store from '@/store'
import "nprogress/nprogress.css"
import { isNull } from "@/util"

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
    if (isNull(store.state.auth.user)) {
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

