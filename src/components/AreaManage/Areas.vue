<!--区域管理页面-->

<template>
  <section class="area-wrapper-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">

      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllArea"></i>
        </section>
      </section>

      <self-tree :jsonData="AreasJsonTree" :treeProps="{children: 'childNodes',label: 'areaName'}"
                 @nodeClick="handleNodeClick" style="margin-top:.5rem"></self-tree>
    </section>

    <section style="width: 100%">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.datasheets')}}</section>
      </section>

      <section class="conditional-query-container" style="margin-top: .5rem">
        <el-row class="query-wrapper-row">
          <el-col :span="5" class="query-wrapper-row-right">
            <section class="query-wrapper-row-item">
              <section class="label-text">{{$t('SearchTips.filter')}}</section>

              <section>
                <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="queryParams.AreaName"
                          @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
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

      <section class="content-box-container">
        <fun-button-group :funs="$route.meta.funs"
                          @refreshEmit="handleLoadAndQuery"
                          @editEmit="handleEdit"
                          @addEmit="handleAdd"
                          @deletedEmit="handleDeleted">
        </fun-button-group>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="420"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    tooltip-effect="light" size="medium"
                    @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :label="$t('AreaManage.table.areaNumber')" prop="areaNumber" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('AreaManage.table.areaName')" prop="areaName" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('AreaManage.table.shortSpell')" prop="shortSpell" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('AreaManage.table.level')" prop="level" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('AreaManage.table.enable')" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enabledMark"
                  active-color="#13ce66"
                  inactive-color="#bfbfbf"
                  :active-value="1"
                  :inactive-value="0"
                  :disabled="true">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="$t('AreaManage.table.remark')" prop="remarks" align="center"
                             show-overflow-tooltip></el-table-column>
          </el-table>
        </section>

        <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                  @pageSizeChange="handlePageSizeChange"
                  @currentPageChange="handlePageChange"></b-paging>
      </section>
    </section>

    <b-area-new :isVisible="newDialog.isVisible"
                :requestUri="newDialog.requestUri"
                @saveRefresh="handleRefresh"
                @closeDialog="newDialog.isVisible = false"></b-area-new>

    <b-area-edit :isVisible="editDialog.isVisible"
                 :requestUri="editDialog.requestUri"
                 :formObject="editDialog.editForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="editDialog.isVisible = false"></b-area-edit>
  </section>
</template>

<script type="text/ecmascript-6">
  import BAreaNew from '@components/AreaManage/BArea/New'
  import BAreaEdit from '@components/AreaManage/BArea/Edit'
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import SelfTree from '@components/basis/BTree/SelfTree'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import {GetAreaJsonTree} from "@/utils/UtilsHelper"
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "Areas",
    mixins: [QueryParamsMixin, MethodsMixin],
    computed: {
      ...mapGetters(['AreasJsonTree'])
    },
    components: {
      BAreaNew,
      BAreaEdit,
      FunButtonGroup,
      BPaging,
      SelfTree
    },
    methods: {
      ...mapActions({
        handleSetAreasJsonTree: 'SetAreasJsonTreeAction'
      }),
      handleLoadAllArea () {
        let _that = this
        _that.treeLoading = true

        _that.$fetch(`${_that.$route.path}`, {})
          .then((ret) => {
            const retData = ret.data

            const jsonTree = GetAreaJsonTree(retData.items, "0")

            _that.handleSetAreasJsonTree(jsonTree)

            _that.treeLoading = false
          })
          .catch(() => {
            _that.treeLoading = false
          })
      },
      handleLoadAndQuery () {
        let _that = this

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
          .catch(() => {
          })
      },
      handleNodeClick (event) {
        this.queryParams.ParentId = event.id

        this.handleLoadAndQuery()
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    created () {
      this.$nextTick(() => {
        if (this.AreasJsonTree.length <= 0) {
          this.$axios.all([this.handleLoadAllArea(), this.handleLoadAndQuery()])
            .then(() => {
            })
        } else {
          this.handleLoadAndQuery()
        }
      })
    },
    data () {
      return {
        treeLoading: false,
        queryParams: {
          AreaName: '',
          ParentId: "0"
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
  .area-wrapper-container {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  }

  .tree-module-wrapper-container {
    width: 15%;
    height: 40rem;
    margin-right: 1rem;
  }
</style>
