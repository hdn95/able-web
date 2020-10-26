<!--角色列表-->
<template>
  <section class="table-container">
    <el-table border :data="dataCollection" max-height="420"
              header-row-class-name="table-header-row-class"
              class="cus-table"
              tooltip-effect="light" size="medium"
              @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column type="selection"></el-table-column>
      <el-table-column :label="$t('Role.table.category')" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.category | formatCategory}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Role.table.code')" prop="enCode" align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column :label="$t('Role.table.name')" prop="fullName" align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column :label="$t('Role.table.isPublic')" prop="isPublic" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.isPublic ===0?"否":"是"}}</span>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script type="text/ecmascript-6">

  export default {
    name: "RolesList",
    props: {
      dataCollection: {
        type: Array
      }
    },
    filters: {
      formatCategory (val) {
        switch (val) {
          case 1: {
            return "角色"
          }
          case 2: {
            return "岗位"
          }
          case 3: {
            return "职位"
          }
          case 4: {
            return "工作组"
          }
        }
      }
    },
    methods: {
      clearSelection: function () {
        this.$refs.multipleTable.clearSelection()
      },
      setRowSelection: function (row) {
        this.$refs.multipleTable.toggleRowSelection(row, true)
      },
      handleSelectionChange: function (val) {
        this.$emit('selectionChange', val)
      }
    }
  }
</script>

<style type="text/css" scoped>

</style>
