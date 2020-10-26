<!--日志页面-->

<template>
  <section>
    <section class="conditional-query-container">
      <el-row :gutter="24" class="query-wrapper-row">
        <el-col :span="3" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('Logs.search.operateType')}}</section>
            <section>
              <el-select v-model="otherParams.OperateType" size="small" class="w-select">
                <el-option v-for="item in LogsOperationType"
                           :key="item.key"
                           :label="item.text"
                           :value="item.value">
                </el-option>
              </el-select>
            </section>
          </section>
        </el-col>

        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('Logs.search.timeRang')}}</section>
            <section>
              <el-date-picker type="datetimerange"
                              @change="handlePickerChange"
                              :start-placeholder="$t('DefaultTips.startTime')"
                              :end-placeholder="$t('DefaultTips.endTime')"
                              v-model="timeRange" is-range range-separator="-"></el-date-picker>
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
                        @detailEmit="handleDetail"></fun-button-group>

      <section class="table-container">
        <el-table border :data="dataCollection" max-height="420"
                  header-row-class-name="table-header-row-class"
                  class="cus-table"
                  tooltip-effect="light" size="medium"
                  @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column :label="$t('Logs.table.operateType')" prop="operateType" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Logs.table.resouceDesc')" header-align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.requestURL" placement="top-start">
                <span v-if="scope.row.resouceDesc">{{scope.row.resouceDesc}}</span>
                <span v-else>{{scope.row.operateType}}</span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column :label="$t('Logs.table.ipAddress')" align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.remoteIPAddress}}:{{scope.row.remotePort}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('Logs.table.operator')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.operaterAccount">{{scope.row.operaterName}}({{scope.row.operaterAccount}})</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Logs.table.requestTime')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.operateDateTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Logs.table.requestMethod')" prop="requestMethodDesc" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Logs.table.isException')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="scope.row.isException ? 'text-error' : 'text-success' ">{{scope.row.isException}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Logs.table.ascriptionSystem')" prop="ascriptionSystemDesc" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-logsdetail :isVisible="detailDialog.isVisible"
                  :logsId="detailDialog.id"
                  @closeDialog="detailDialog.isVisible = false"></b-logsdetail>
  </section>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "@/utils/UtilsHelper"
  import {LogsOperationType} from "@/common/js/BasisConfig"
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BLogsdetail from '@components/Base/BLogs/Details'

  export default {
    name: "Logs",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BPaging,
      FunButtonGroup,
      BLogsdetail
    },
    filters: {
      firstLetterUpperCase (event) {
        return `${event.substring(0, 1).toUpperCase()}${event.substring(1)}`
      },
      formatDate (event) {
        return formatDate(event, "yyyy-MM-dd hh:mm:ss")
      }
    },
    methods: {
      handlePickerChange () {
        this.handleLoadAndQuery()
      },
      handleDetail () {
        let _that = this

        if (!_that.handleCheckSelection()) return false

        _that.detailDialog = {
          isVisible: true,
          id: _that.multipleSelection[0].id
        }
      },
      handleLoadAndQuery () {
        let _that = this

        if (_that.timeRange !== "" && _that.timeRange !== null) {
          _that.otherParams = Object.assign({}, _that.otherParams, {
            OperateMinDateTime: formatDate(_that.timeRange[0], 'yyyy-MM-dd hh:mm:ss'),
            OperateMaxDateTime: formatDate(_that.timeRange[1], 'yyyy-MM-dd hh:mm:ss')
          })
        }

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryPages, _that.otherParams))
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
        detailDialog: {
          isVisible: false,
          id: ""
        },
        LogsOperationType: LogsOperationType,
        timeRange: "",
        otherParams: {
          OperateType: "",
          OperateMinDateTime: "",
          OperateMaxDateTime: ""
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
