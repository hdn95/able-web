<!--所有的树组件-->

<template>
  <section>
    <el-input v-if="needSearch" :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="filterText"
              style="margin-bottom: .5rem"
              :clearable="true"></el-input>
    <el-tree :data="jsonData" :props="treeProps"
             :accordion="accordion"
             :default-expand-all="defaultExpandAll"
             :expand-on-click-node="false"
             :show-checkbox="showCheckbox"
             :check-strictly="checkStrictly"
             :default-expanded-keys="defaultExpand"
             :filter-node-method="filterNode"
             node-key="id" ref="tree" :indent="20" style="font-size: .8125rem">
      <section slot-scope="{ node, data }"
               @click="handleNodeClick(data)">{{node.label}}
      </section>
    </el-tree>
  </section>
</template>

<script>
  export default {
    name: "SelfTree",
    props: {
      needSearch: {
        typ: Boolean,
        default: true
      },
      accordion: {
        typ: Boolean,
        default: true
      },
      defaultExpandAll: {
        typ: Boolean,
        default: false
      },
      jsonData: {
        type: Array
      },
      treeProps: {
        type: Object,
        default: function () {
          return {
            children: 'childNodes',
            label: 'description'
          }
        }
      },
      showCheckbox: {
        typ: Boolean,
        default: false
      },
      checkStrictly: {
        typ: Boolean,
        default: true
      }
    },
    data () {
      return {
        filterText: '',
        defaultExpand: []
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      filterNode (value, data, node) {
        if (!value) return true

        return node.label.indexOf(value) !== -1
      },
      setFold: function () {
        for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.isexpand
        }
      },
      setDefaultExpand: function (list) {
        this.defaultExpand = list
      },
      setCheckedKeys: function (list) {
        this.$refs.tree.setCheckedKeys(list)
      },
      getCheckedNodes: function () {
        return this.$refs.tree.getCheckedNodes()
      },
      getCheckedKeys: function () {
        return this.$refs.tree.getCheckedKeys()
      },
      handleNodeClick: function (data) {
        this.$emit('nodeClick', data)
      }
    }
  }
</script>

<style type="text/css" scoped>

</style>
