<!--标签页的组件-->

<template>
  <section class="tabs-wrapper-container">
    <el-tag class="tabs-item" :type="'/' === $route.path ? 'success': 'info'"
            @click.native="handleRouter({path:'/'})">{{$t('Home.title')}}
    </el-tag>

    <template v-for="(item,index) in RouterTabs">
      <el-tag :key="index" closable class="tabs-item"
              :type="item.path === $route.path ? 'success': 'info'"
              @click.native="handleRouter(item)" @close="handleRemoveRouterTabs(item)">
        {{item.title}}
      </el-tag>
    </template>
  </section>

</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "index",
    computed: {
      ...mapGetters(['RouterTabs'])
    },
    methods: {
      ...mapActions({
        handleRemoveRouterTabs: "RemoveRouterTabsAction"
      }),
      handleRouter (event) {
        this.$router.push({
          path: event.path
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .tabs-wrapper-container >>> .tabs-item:last-child {
    margin-right: 0rem;
  }

  .tabs-wrapper-container >>> .tabs-item {
    margin-right: .5rem;
    cursor: pointer;
  }

  .tabs-wrapper-container {
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #ffffff;
    padding: 0rem 1rem 0rem 1rem;
    overflow-x: auto;
  }
</style>
