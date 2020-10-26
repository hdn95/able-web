<!--部门管理页面-->

<template>
  <section>
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>

            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Department.search.departmentName')" value="DepartmentName"></el-option>
                  <el-option :label="$t('Department.search.departmentID')" value="DepartmentId"></el-option>
                </el-select>
              </el-input>
            </section>
          </section>
        </el-col>
        <el-col :span="4" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('Department.search.owner')}}</section>
            <section>
              <el-select v-model="queryOrganizeId" size="small" class="w-select">
                <el-option :label="$t('DefaultTips.all')" value=""></el-option>
                <el-option v-for="item in 5"
                           :key="item"
                           :label="'Organize' + (item)"
                           :value="item">
                </el-option>
              </el-select>
            </section>

          </section>
        </el-col>
        <el-col :span="5">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">
            {{$t('DefaultButton.searchButtonText')}}
          </el-button>
        </el-col>
      </el-row>
    </section>

    <section class="content-box-container">
      <fun-button-group :funs="$route.meta.funs"
                        @refreshEmit="handleLoadAndQuery"
                        @deletedEmit="handleDeleted"
                        @addEmit="handleAdd"
                        @editEmit="handleEdit"
                        @detailEmit="handleDetail"></fun-button-group>

      <section class="table-container">
        <el-table border :data="dataCollection" max-height="420"
                  header-row-class-name="table-header-row-class"
                  class="cus-table"
                  tooltip-effect="light" size="medium"
                  @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column :label="$t('Department.table.enCode')" prop="enCode" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.shortName')" prop="shortName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.fullName')" prop="fullName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.nature')" prop="nature" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.outerPhone')" prop="outerPhone" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.fax')" prop="fax" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.manager')" prop="manager" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Department.table.layer')" prop="layer" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex"
                :pageSize="queryPages.PageSize"
                :total="totalCount" @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-department-new :isVisible="newDialog.isVisible"
                      :requestUri="newDialog.requestUri"
                      @saveRefresh="handleRefresh"
                      @closeDialog="newDialog.isVisible = false"></b-department-new>

    <b-department-edit :isVisible="editDialog.isVisible"
                       :requestUri="editDialog.requestUri"
                       :formObject="editDialog.editForm"
                       @saveRefresh="handleRefresh"
                       @closeDialog="editDialog.isVisible = false"></b-department-edit>
    <b-department-details :isVisible="detailsDialog.isVisible" :requestUri="detailsDialog.requestUri"
                 :formObject="detailsDialog.detailsForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="detailsDialog.isVisible = false"></b-department-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BPaging from '@components/basis/BPaging/index'
  import BDepartmentNew from '@components/Base/BDepartment/New'
  import BDepartmentEdit from '@components/Base/BDepartment/Edit'
  import BDepartmentDetails from '@components/Base/BDepartment/Details'

  export default {
    name: "Departments",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      FunButtonGroup,
      BPaging,
      BDepartmentNew,
      BDepartmentEdit,
      BDepartmentDetails
    },
    data () {
      return {
        querySearchKey: '',
        queryType: 'DepartmentName',
        queryOrganizeId: '',
        queryParams: {
          DepartmentId: '',
          DepartmentName: ''
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    methods: {
      handleLoadAndQuery: function () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, this.queryParams, this.queryPages, {OrganizeId: this.queryOrganizeId}))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
          .catch(() => {

          })
      }
    },
    created () {
      this.$nextTick(() => {
        this.handleLoadAndQuery()
      })
    }
  }
</script>

<style type="text/css" scoped>

</style>
