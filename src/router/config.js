import { AuthLayout, DefaultLayout } from "@/components/layouts"

export const routes = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Sign in" },
    redirect: "/auth/signin",
    hidden: true,
    children: [
      {
        path: "signin",
        name: "signin",
        meta: { title: "Sign in" },
        component: () => import(/* webpackChunkName: "signin" */ "@/views/auth/Signin.vue")
      },
      {
        path: "signup",
        name: "signup",
        meta: { title: "Sign up" },
        component: () => import(/* webpackChunkName: "signup" */ "@/views/auth/Signup.vue")
      },
      {
        path: "signout",
        name: "signout",
        meta: { title: "Sign out", authRequired: true },
        component: () => import(/* webpackChunkName: "signout" */ "@/views/auth/Signout.vue")
      }
    ]
  },

  {
    path: "/403",
    name: "access-denied",
    meta: { title: "Access Denied"},
    component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/AccessDenied.vue")
  },

  {
    path: "/404",
    name: "not-found",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "server-error",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/ServerError.vue")
  },

  {
    path: "/",
    name: "home",
    component: DefaultLayout,
    meta: { title: "Home"},
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Home", authRequired: true},
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },
      {
        path: "profile",
        name: "profile",
        meta: { title: "Profile", authRequired: true },
        component: () => import(/* webpackChunkName: "profile" */ "@/views/Profile.vue")
      },
      {
        path: "/about",
        name: "About",
        meta: { title: "About"},
        component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
      },
    ]
  },

  //list
  /*{
    path: "/cms",
    component: DefaultLayout,
    redirect: "/cms/table",
    meta: { title: "CMS", icon: "view_compact", group: "cms" },
    children: [
      {
        // path: "/cms/table",
        // name: "ListTable",
        // meta: { title: "CMS Table" },
        // component: () => import("@/views/list/Table.vue")
      }
    ]
  }*/

  //widgets
  {
    path: "/widgets",
    component: DefaultLayout,
    meta: { title: "Widget"},
    redirect: "/widgets/list",
    children: [
      {
        path: "/widgets/list",
        name: "ListWidget",
        meta: { title: "List Widget", authRequired: true },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/widgets/List.vue")
      }
      /*,
      {
        path: "/widgets/chart",
        name: "ChartWidget",
        meta: { title: "Chart Widget" },
        component: () => import("@/views/widgets/Chart.vue")
      },
      */
    ]
  },
]