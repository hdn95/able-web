<!--页面左侧菜单组件-->
<template>
  <section class="overall-middle-menu-container" :style="{width: MenuCollapse ? '4rem' : '15rem'}">
    <el-menu background-color="#303133"
             text-color="#fff"
             active-text-color="#ffd04b"
             :unique-opened="true"
             :default-active="$route.path"
             :router="true"
             :collapse="MenuCollapse" v-if="LoginUser && MenusJsonTree.length > 0">
      <el-menu-item index="/">
        <i class="el-icon-ump-home"></i><span slot="title">{{$t('Home.title')}}</span>
      </el-menu-item>

      <template v-for="(navMenu) in MenusJsonTree[0].childNodes" v-if="navMenu.attributeValue !== '999'">
        <el-submenu v-if="(navMenu.isDisplay) && (navMenu.childNodes.length>0) && (navMenu.attributeValue === '100')"
                    :key="navMenu.id" :index="navMenu.value">
          <template slot="title">
            <i :class="navMenu.img === null ? 'el-icon-setting' : navMenu.img"></i>
            <span slot="title">{{navMenu.text}}</span>
          </template>
          <nav-menu :navMenus="navMenu.childNodes"></nav-menu>
        </el-submenu>

        <el-menu-item :key="navMenu.id" :index="navMenu.value"
                      v-else-if="(navMenu.attributeValue === '200') && navMenu.isDisplay">
          <i :class="navMenu.img === null  ? 'el-icon-ump-home' : navMenu.img"></i>
          <span slot="title">{{navMenu.text}}</span>
        </el-menu-item>
      </template>
      <!--<nav-menu :navMenus="MenusJsonTree[0].childNodes"></nav-menu>-->
    </el-menu>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NavMenu from '@components/basis/BMenu/NavMenu.vue' // 菜单子组件
  import {MenuMixin} from "@/common/mixin/MenuMixin"

  export default {
    name: "index",
    mixins: [MenuMixin],
    computed: {
      ...mapGetters(['MenusJsonTree', 'MenuCollapse'])
    },
    components: {
      NavMenu
    },
    created () {
      const _that = this

      _that.$nextTick(() => {
        if (_that.LoginUser !== null) {

          if (_that.MenusJsonTree.length <= 0) {
            _that.handleGetMenu() // 请求菜单方法

          } else {
            const newTreeJson = this.MenusJsonTree[0].childNodes

            _that.handleAddRouter(newTreeJson)
          }
        }
      })
    }
  }
</script>

<style type="text/css" scoped>

</style>
