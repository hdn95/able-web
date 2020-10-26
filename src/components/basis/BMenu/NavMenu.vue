<!--左侧菜单子组件-->

<template>
  <section>
    <template v-for="(navMenu) in navMenus" v-if="navMenu.attributeValue !=='999'">

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
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "NavMenu",
    props: ['navMenus']
  }
</script>

<style type="text/css" scoped>

</style>
