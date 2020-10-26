import {GetLoginUser} from "@common/js/login/LoginManage"
import {Base} from "@common/js/ApiConfig"
import {mapActions} from 'vuex'
import {GetMenusJsonTree} from "@utils/UtilsHelper"

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 菜单混入
 */
export const MenuMixin = {
  computed: {
    LoginUser () {
      return GetLoginUser()
    }
  },
  methods: {
    ...mapActions({
      handleSetMenusJsonTree: 'SetMenusJsonTreeAction'
    }),
    // 动态添加路由的方法
    handleAddRouter (list) {
      this._formatRouter(list)

      this.routers.push({
        path: '*',
        name: 'notFind',
        meta: {
          routerLevel: 1,
          requiresAuth: true,
          title: '404'
        },
        component: (resolve) => {
          import('@components/error/index.vue').then((module) => {
            resolve(module)
          })
        }
      })

      this.$router.addRoutes(this.routers) // 往路由里面添加路由
    },
    // 格式化路由
    _formatRouter (list) {
      if (list.length <= 0) return

      list.map((item) => {
        if (item.attributeValue === '200') {
          this.routers.push({
            path: `${item.value}`,
            name: `${item.text}`,
            meta: {
              routerLevel: 1, // 路由等级
              keepAlive: true, // 页面是否需要缓存
              requiresAuth: true, // 是否需要登陆验证
              title: `${item.text}`, // 页面的标题
              funs: item.childNodes // 页面功能点的集合
            },
            // 当前路由的组件
            component: (resolve) => {
              import(`@/components${item.value}.vue`).then((module) => {
                resolve(module)
              })
            }
          })
        }

        this._formatRouter(item.childNodes)
      })
    },
    // 请求全部菜单的方法
    handleGetMenu (needRefresh) {
      let _that = this

      _that.$fetch(`${Base.getMenu}/${_that.LoginUser.id}`, {})
        .then((ret) => {
          const treeJson = GetMenusJsonTree(ret.data, '-1')

          _that.handleSetMenusJsonTree(treeJson)

          needRefresh ? window.location.reload() : _that.handleAddRouter(treeJson)
        })
        .catch(() => {
        })
    }
  },
  data () {
    return {
      routers: []
    }
  }
}
