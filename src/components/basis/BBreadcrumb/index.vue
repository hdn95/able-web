<!--面包屑-->
<template>
  <section class="breadcrumb-container">
    <section class="zk-sq-container">
      <transition name="fade" mode="out-in">
        <i :title="$t('DefaultTips.expand')" class="el-icon-ump-zhankai" @click="handleSetMenuCollapse(false)"
           v-if="menuCollapse"></i>
        <i :title="$t('DefaultTips.collapse')" class="el-icon-ump-shouqi" @click="handleSetMenuCollapse(true)"
           v-else></i>
      </transition>
    </section>

    <section style="font-size: .75rem;color: #C0C4CC;">{{$t('DefaultTips.currentLocation')}}：</section>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="index" v-for="(item,index) in historyRoutes" :to="{ path: item.path }">
        <i class="el-icon-ump-home" v-if="index==='0'"></i>{{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "index",
    computed: {
      ...mapGetters(
        {
          historyRoutes: 'HistoryRoutes',
          menuCollapse: 'MenuCollapse'
        })
    },
    methods: {
      ...mapActions({
        handleSetMenuCollapse: 'SetMenuCollapseAction'
      })
    }
  }
</script>

<style type="text/css" scoped>
  .breadcrumb-container >>> .zk-sq-container {
    margin-right: .5rem;
    cursor: pointer;
    color: #909399;
  }

  .breadcrumb-container >>> .el-breadcrumb {
    font-size: .75rem;
  }

  .breadcrumb-container {
    height: 2.45rem;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    background-color: #E4E7ED;
    border-bottom: 1px solid #E4E7ED;
  }
</style>
