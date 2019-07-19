import { AuthLayout, DefaultLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Home", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      }
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
    meta: { title: "Widget", icon: "widgets", group: "advance" },
    redirect: "/widgets/list",
    children: [
      {
        path: "/widgets/list",
        name: "ListWidget",
        meta: { title: "List Widget" },
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