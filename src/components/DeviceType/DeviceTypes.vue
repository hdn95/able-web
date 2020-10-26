<!--设备类型列表页面-->

<template>
  <section class="deviceType-wrapper-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">

      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllDeviceType"></i>
        </section>
      </section>

      <self-tree :jsonData="DeviceTypeJsonTree" :treeProps="{children: 'childNodes',label: 'typeName'}"
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
                <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="queryParams.TypeName"
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

          <template slot="leftOperate">
            <el-button @click="handleInitSetting" icon="el-icon-setting" type="info">初始化设置
            </el-button>
          </template>
        </fun-button-group>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="420"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    tooltip-effect="light" size="medium"
                    @selection-change="handleSelectionChange" ref="multipleTable">

            <el-table-column type="selection"></el-table-column>
            <el-table-column :label="$t('DeviceType.table.typeCode')" prop="typeCode" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DeviceType.table.typeName')" prop="typeName" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DeviceType.table.typeName_en')" prop="typeName_en" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DeviceType.table.enable')" align="center" show-overflow-tooltip>
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
            <el-table-column :label="$t('DeviceType.table.remark')" prop="remark" align="center"
                             show-overflow-tooltip></el-table-column>
          </el-table>
        </section>

        <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                  @pageSizeChange="handlePageSizeChange"
                  @currentPageChange="handlePageChange"></b-paging>
      </section>
    </section>

    <b-devicetype-new :isVisible="newDialog.isVisible"
                      :requestUri="newDialog.requestUri"
                      @saveRefresh="handleRefresh"
                      @closeDialog="newDialog.isVisible = false"></b-devicetype-new>

    <b-devicetype-edit :isVisible="editDialog.isVisible"
                       :requestUri="editDialog.requestUri"
                       :formObject="editDialog.editForm"
                       @saveRefresh="handleRefresh"
                       @closeDialog="editDialog.isVisible = false"></b-devicetype-edit>

    <init-setting :isVisible="initSetting.isVisible"
                  :deviceTypeId="initSetting.deviceTypeId"
                  :requestUri="initSetting.requestUri"
                  @closeDialog="initSetting.isVisible = false"></init-setting>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import SelfTree from '@components/basis/BTree/SelfTree'
  import BDevicetypeNew from '@components/DeviceType/BDeviceType/New'
  import BDevicetypeEdit from '@components/DeviceType/BDeviceType/Edit'
  import {GetDeviceTypeJsonTree} from "@/utils/UtilsHelper"
  import InitSetting from '@components/DeviceType/InitSetting'

  export default {
    name: "DeviceTypes",
    mixins: [QueryParamsMixin, MethodsMixin],
    computed: {
      ...mapGetters(['DeviceTypeJsonTree'])
    },
    components: {
      BDevicetypeNew,
      BDevicetypeEdit,
      FunButtonGroup,
      BPaging,
      SelfTree,
      InitSetting
    },
    methods: {
      handleInitSetting () {
        let _that = this

        if (!_that.handleCheckSelection()) return false

        this.initSetting = {
          isVisible: true,
          deviceTypeId: _that.multipleSelection[0].id,
          requestUri: ''
        }
      },
      ...mapActions({
        handleSetDeviceTypeJsonTree: 'SetDeviceTypeJsonTreeAction'
      }),
      handleLoadAllDeviceType () {
        let _that = this
        _that.treeLoading = true

        _that.$fetch(`${_that.$route.path}`, {})
          .then((ret) => {
            const retData = ret.data

            const jsonTree = GetDeviceTypeJsonTree(retData.items, "0")

            _that.handleSetDeviceTypeJsonTree(jsonTree)

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
        if (this.DeviceTypeJsonTree.length <= 0) {
          this.$axios.all([this.handleLoadAllDeviceType(), this.handleLoadAndQuery()])
            .then(() => {
            })
        } else {
          this.handleLoadAndQuery()
        }
      })
    },
    data () {
      return {
        initSetting: {
          isVisible: false,
          deviceTypeId: '',
          requestUri: ''
        },
        treeLoading: false,
        queryParams: {
          TypeName: '',
          ParentId: "0"
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
  .deviceType-wrapper-container {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  }

  .tree-module-wrapper-container {
    width: 16%;
    height: 40rem;
    margin-right: 1rem;
  }
</style>
