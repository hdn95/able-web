import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import i18n from '@common/lang/index'
import { GetLoginUser } from "@common/js/login/LoginManage"
import { Message } from "element-ui"
import { RouterTitleMultilanguage, ErrorMsgMultilanguage } from "@/common/lang/Language"

let locale = i18n.locale

Vue.use(Router)

/**
 *@date:
 *@desc: 路由集合
 */
const router = new Router({
  mode: "history",
  routes: [

    {
      path: '/',
      name: 'home',
      meta: {
        routerLevel: 0,
        requiresAuth: true,
        title: RouterTitleMultilanguage[locale].home
      },
      component: (resolve) => {
        import('@components/home/index.vue').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false,
        title: RouterTitleMultilanguage[locale].login
      },
      component: (resolve) => {
        import('@components/login/index.vue').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/loginLog',
      name: 'loginLog',
      meta: {
        routerLevel: 0,
        keepAlive: true,
        requiresAuth: true,
        title: RouterTitleMultilanguage[locale].loginLog
      },
      component: (resolve) => {
        import('@components/login/Loginlog.vue').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/dev/setting',
      name: 'DeviceSetting',
      meta: {
        requiresAuth: false,
        title: RouterTitleMultilanguage[locale].setting
      },
      component: (resolve) => {
        import('@components/Settings/Setting.vue').then((module) => {
          resolve(module)
        })
      }
    }
  ]
})

/**
 *@date:
 *@desc: 面包屑集合
 */
let historyRoutes = [{
  routerLevel: router.options.routes[0].meta.routerLevel,
  title: router.options.routes[0].meta.title,
  path: router.options.routes[0].path
}]

/**
 *@date:
 *@desc: 全局导航守卫
 */
router.beforeEach((to, from, next) => {
  let loginUser = GetLoginUser()

  if (to.meta.requiresAuth === undefined) {
    if (loginUser === null) {
      next({
        replace: true,
        path: '/login',
        query: { ret: to.fullPath }
      })
    }

    next()
  }

  let toRoutes = {
    routerLevel: to.meta.routerLevel,
    title: to.meta.title,
    path: to.path
  }

  switch (to.meta.routerLevel) {
    case 0:
      {
        historyRoutes.splice(1)

        break
      }
    case 1:
      {
        historyRoutes.splice(1)

        historyRoutes.push(toRoutes)

        break
      }
    case 2:
      {
        const index = historyRoutes.indexOf(to)

        if (index > -1) {
          historyRoutes.splice(index + 1)
        }

        historyRoutes.push(toRoutes)

        break
      }
  }

  store.dispatch('SetHistoryRoutesAction', Object.assign({}, historyRoutes))

  if (to.meta.title) document.title = `${to.meta.title}`

  if (to.path !== "/login" && to.path !== "/") {
    store.dispatch('SetRouterTabsAction', { title: to.meta.title, path: to.path })
  }

  if (loginUser !== null && to.path === "/login") {
    next({
      path: '/'
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (loginUser == null) {
      Message({
        message: ErrorMsgMultilanguage[locale].login_expired,
        type: 'error',
        duration: 1500
      })

      next({
        path: '/login',
        query: { ret: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
