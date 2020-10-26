<!--机构管理页面-->

<template>
  <section class="organizes-manage-main-container">
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>

            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Organize.search.organizeName')" value="OrganizeName"></el-option>
                  <el-option :label="$t('Organize.search.organizeID')" value="OrganizeId"></el-option>
                </el-select>
              </el-input>
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

    <section class="content-box-container organizes-result-container">
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
          <el-table-column :label="$t('Organize.table.shortName')" prop="shortName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.fullName')" prop="fullName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.nature')" prop="nature" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.outerPhone')" prop="outerPhone" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.fax')" prop="fax" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.businessScope')" prop="businessScope" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Organize.table.webAddress')" align="center" show-overflow-tooltip width="90px">
            <template slot-scope="scope">
              <a :href="scope.row.webAddress" target="_blank" class="a-link-jump">
                {{$t('Organize.tips.view')}}
              </a>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Organize.table.description')" prop="description" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex"
                :pageSize="queryPages.PageSize"
                :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-organize-new :isVisible="newDialog.isVisible"
                    :requestUri="newDialog.requestUri"
                    @saveRefresh="handleRefresh"
                    @closeDialog="newDialog.isVisible = false"></b-organize-new>

    <b-organize-edit :isVisible="editDialog.isVisible"
                     :requestUri="editDialog.requestUri"
                     :formObject="editDialog.editForm"
                     @saveRefresh="handleRefresh"
                     @closeDialog="editDialog.isVisible = false"></b-organize-edit>
  
    <b-organize-details :isVisible="detailsDialog.isVisible" :requestUri="detailsDialog.requestUri"
                 :formObject="detailsDialog.detailsForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="detailsDialog.isVisible = false"></b-organize-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BOrganizeNew from '@components/Base/BOrganize/New'
  import BOrganizeEdit from '@components/Base/BOrganize/Edit'
  import BOrganizeDetails from '@components/Base/BOrganize/Details'

  export default {
    name: "Organizes",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BPaging,
      FunButtonGroup,
      BOrganizeNew,
      BOrganizeEdit,
      BOrganizeDetails
    },
    methods: {
      handleLoadAndQuery: function () {
        const _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
          .catch(() => {

          })
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    data () {
      return {
        querySearchKey: '',
        queryType: 'OrganizeName',
        queryParams: {
          OrganizeId: '',
          OrganizeName: ''
        }
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
