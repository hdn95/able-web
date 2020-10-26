<!--阈值数据详情页面-->

<template>
  <section class="threshold-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllThreshold"></i>
        </section>
      </section>

      <self-tree :jsonData="Thresholds" :treeProps="{children: 'childNodes',label: 'projectName'}"
                 :defaultExpandAll="true"
                 @nodeClick="handleNodeClick" style="margin-top:.5rem"></self-tree>
    </section>

    <section style="width: 100%">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.datasheets')}}</section>
      </section>

      <section class="conditional-query-container" style="margin-top: .5rem">
        <el-row class="query-wrapper-row">
          <el-col :span="7" class="query-wrapper-row-right">
            <section class="query-wrapper-row-item">
              <section class="label-text">{{$t('SearchTips.filter')}}</section>

              <section>
                <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                          @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                  <el-select v-model="queryType" slot="prepend" class="input-select">
                    <el-option :label="$t('Thresholds.search.name')" value="LevelNo"></el-option>
                  </el-select>
                </el-input>
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
                          @editEmit="handleEdit"
                          @addEmit="handleAdd"
                          @deletedEmit="handleDeleted">
        </fun-button-group>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="420"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    tooltip-effect="light" size="medium"
                    :default-sort="{prop: 'level_Min', order: 'descending'}"
                    @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :label="$t('ThresholdDetail.table.level_No')" prop="level_No" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('ThresholdDetail.table.level_Desc')" prop="level_Desc" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('ThresholdDetail.table.level_Min')" prop="level_Min" align="center"
                             show-overflow-tooltip
                             sortable></el-table-column>
            <el-table-column :label="$t('ThresholdDetail.table.level_Max')" prop="level_Max" align="center"
                             show-overflow-tooltip
                             sortable></el-table-column>
            <el-table-column :label="$t('ThresholdDetail.table.enable')" align="center" show-overflow-tooltip>
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
            <el-table-column :label="$t('ThresholdDetail.table.remark')" prop="remark" align="center"
                             show-overflow-tooltip></el-table-column>
          </el-table>
        </section>

        <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                  @pageSizeChange="handlePageSizeChange"
                  @currentPageChange="handlePageChange"></b-paging>
      </section>
    </section>

    <b-threshold-detail-new :isVisible="newDialog.isVisible" :requestUri="newDialog.requestUri"
                            @saveRefresh="handleRefresh"
                            @closeDialog="newDialog.isVisible = false"></b-threshold-detail-new>

    <b-threshold-detail-edit :isVisible="editDialog.isVisible" :requestUri="editDialog.requestUri"
                             :formObject="editDialog.editForm"
                             @saveRefresh="handleRefresh"
                             @closeDialog="editDialog.isVisible = false"></b-threshold-detail-edit>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  import BThresholdDetailNew from '@components/Threshold/BThresholdDetail/New'
  import BThresholdDetailEdit from '@components/Threshold/BThresholdDetail/Edit'
  import SelfTree from '@components/basis/BTree/SelfTree'
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {MethodsMixin, QueryParamsMixin} from "@common/mixin/mixin"

  export default {
    name: "ThresholdDetail",
    mixins: [QueryParamsMixin, MethodsMixin],
    computed: {
      ...mapGetters(['Thresholds'])
    },
    components: {
      BThresholdDetailNew,
      BThresholdDetailEdit,
      FunButtonGroup,
      BPaging,
      SelfTree
    },
    methods: {
      ...mapActions({
        handleSetThresholds: 'SetThresholdsAction'
      }),
      handleLoadAllThreshold () {
        let _that = this

        _that.treeLoading = true

        _that.$fetch(`/Threshold/Thresholds`, {})
          .then((ret) => {
            let retData = ret.data.items

            _that.handleSetThresholds(retData)

            _that.treeLoading = false
          })
          .catch(() => {
            _that.treeLoading = false
          })
      },
      handleNodeClick (event) {
        this.thresholdId = event.id

        this.handleLoadAndQuery()
      },
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages, {Thresholdid: _that.thresholdId}))
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
        if (this.Thresholds.length <= 0) {
          this.handleLoadAllThreshold()
        }
      })
    },
    data () {
      return {
        thresholdId: '',
        treeLoading: false,
        querySearchKey: '',
        queryType: 'LevelNo',
        queryParams: {
          LevelNo: ''
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
  .threshold-container {
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
