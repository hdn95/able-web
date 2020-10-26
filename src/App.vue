<template>
  <section v-if="$route.name!=='login' && $route.name !== 'DeviceSetting'" class="overall-main-wrapper-container">
    <b-header></b-header>
    <section class="overall-middle-container">
      <b-menu></b-menu>

      <section class="overall-middle-content-container">
        <section class="overall-middle-content-main-container">
          <b-breadcrumb></b-breadcrumb>
          <b-tabs></b-tabs>

          <section class="content-box-wrapper-container">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </section>
        </section>

        <b-footer></b-footer>
      </section>
    </section>
  </section>

  <section v-else class="login-container">
    <router-view></router-view>
  </section>
</template>

<script>
  import BHeader from '@basis/BHeader/index' // 头部组件
  import BFooter from '@basis/BFooter/index' // 尾部组件
  import BBreadcrumb from '@basis/BBreadcrumb/index' // 面包屑组件
  import BMenu from '@basis/BMenu/index' // 菜单组件
  import BTabs from '@basis/BTabs/index' // 标签页组件
  import {WebSocketMixin} from "@/common/mixin/WebSocketMixin" // WebSocket的混入
  import {GetLoginUser} from "@common/js/login/LoginManage"

  export default {
    name: 'App',
    mixins: [WebSocketMixin],
    computed: {
      LoginUser () {
        return GetLoginUser()
      }
    },
    components: {
      BHeader,
      BFooter,
      BBreadcrumb,
      BMenu,
      BTabs
    },
    created () {
      this.$nextTick(() => {
        if (this.LoginUser !== null) {
          this.handleGetWebSocketUri()
        }
      })
    }
  }
</script>

<style type="text/css" scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }
</style>
