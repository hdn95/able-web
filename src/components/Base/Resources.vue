<!--资源管理页面-->

<template>
  <section class="resources-manage-main-container">
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>
            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">

                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Resource.search.owner')" value="Owner"></el-option>
                  <el-option :label="$t('Resource.search.description')" value="Description"></el-option>
                  <el-option :label="$t('Resource.search.url')" value="url"></el-option>
                </el-select>
              </el-input>
            </section>
          </section>
        </el-col>

        <el-col :span="3" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.requestType')}}</section>
            <section>
              <el-select v-model="otherParams.MethodType" size="small" class="w-select">
                <el-option :label="$t('DefaultTips.all')" value=""></el-option>
                <el-option v-for="item in methodType"
                           :key="item.key"
                           :label="item.text"
                           :value="item.key">
                </el-option>
              </el-select>
            </section>
          </section>
        </el-col>

        <el-col :span="3" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.resourceType')}}</section>
            <section>
              <el-select v-model="otherParams.ResourceType" size="small" class="w-select">
                <el-option :label="$t('DefaultTips.all')" value=""></el-option>
                <el-option v-for="item in resourceType"
                           :key="item.key"
                           :label="item.text"
                           :value="item.key">
                </el-option>
              </el-select>
            </section>
          </section>
        </el-col>

        <el-col :span="10">
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
          <el-table-column :label="$t('Resource.table.owner')" prop="owner" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Resource.table.parentModule')" prop="parentName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Resource.table.description')" prop="description" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Resource.table.icon')" align="center" show-overflow-tooltip>
            <template slot-scope="scope"><i :class="scope.row.icon" style="font-size: 18px;"></i></template>
          </el-table-column>
          <el-table-column :label="$t('Resource.table.cssName')" prop="cssName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Resource.table.requestType')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{formatMethodType(scope.row.requestMethod)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Resource.table.resourceType')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{formatResourceType(scope.row.resourceType)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Resource.table.jsEvent')" prop="jsEvent" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-resource-new :isVisible="newDialog.isVisible"
                    :requestUri="newDialog.requestUri"
                    @saveRefresh="handleRefresh"
                    @closeDialog="newDialog.isVisible = false"></b-resource-new>

    <b-resource-edit :isVisible="editDialog.isVisible"
                     :requestUri="editDialog.requestUri"
                     :formObject="editDialog.editForm"
                     @saveRefresh="handleRefresh"
                     @closeDialog="editDialog.isVisible = false"></b-resource-edit>
            
    <b-resource-details :isVisible="detailsDialog.isVisible" :requestUri="detailsDialog.requestUri"
                 :formObject="detailsDialog.detailsForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="detailsDialog.isVisible = false"></b-resource-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import BResourceEdit from '@components/Base/BResource/Edit'
  import BResourceNew from '@components/Base/BResource/New'
  import BResourceDetails from '@components/Base/BResource/Details'
  import {StringReplace} from "@utils/UtilsHelper"
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {MethodType} from "@common/js/BasisConfig"

  export default {
    name: "Resources",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BPaging,
      FunButtonGroup,
      BResourceNew,
      BResourceEdit,
      BResourceDetails
    },
    filters: {
      stringReplace: function (val) {
        return StringReplace(val, 3, 4)
      }
    },
    methods: {
      formatResourceType: function (val) {
        for (const key in this.resourceType) {

          if (this.resourceType[key].key === val) {
            return this.resourceType[key].text
          }
        }
      },
      formatMethodType: function (val) {
        for (const key in this.methodType) {

          if (this.methodType[key].key === val) {
            return this.methodType[key].text
          }
        }
      },
      handleLoadAndQuery: function () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages, _that.otherParams))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
          .catch(() => {
          })
      }
    },
    data () {
      return {
        querySearchKey: '',
        queryType: 'Owner',
        methodType: MethodType,
        resourceType: [
          {text: this.$t('ResourceType.module'), key: 100},
          {text: this.$t('ResourceType.page'), key: 200},
          {text: this.$t('ResourceType.function'), key: 300},
          {text: this.$t('ResourceType.other'), key: 999}
        ],
        otherParams: {
          MethodType: '',
          ResourceType: ''
        },
        queryParams: {
          Owner: '',
          Description: '',
          url: ''
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
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
