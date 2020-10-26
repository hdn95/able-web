<!--电机数据开关机页面-->

<template>
  <section class="switchgear-wrapper-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadDevicesTree"></i>
        </section>
      </section>

      <self-tree :jsonData="leftDevicesTree" :treeProps="treeProps"
                 :defaultExpandAll="true"
                 @nodeClick="handleNodeClick" style="margin-top:.5rem"></self-tree>
    </section>

    <section class="right-wrapper-container">
      <section class="title-module-wrapper-container" style="margin-bottom: .8rem">
        <section class="left-title-module">当前设备
          <span v-if="deviceUid">({{deviceUid.substr(-8)}})</span>          
        </section>
      </section>

      <section class="conditional-query-container">
        <el-row class="query-wrapper-row">
          <el-col :span="8" class="query-wrapper-row-right">
            <section class="query-wrapper-row-item">
              <section class="label-text">{{$t('SearchTips.filter')}}</section>

              <section>
                <el-date-picker type="datetimerange"
                                @change="handlePickerChange"
                                :start-placeholder="$t('DefaultTips.startTime')"
                                :end-placeholder="$t('DefaultTips.endTime')"
                                :picker-options="pickerOptions"
                                v-model="timeRange" is-range range-separator="-"></el-date-picker>
              </section>
            </section>
          </el-col>

          <el-col :span="2">
            <el-button @click="handleLoadAndQuery" type="danger" size="small" icon="el-icon-search">
              {{$t('DefaultButton.searchButtonText')}}
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleLoadAndQuery" size="small" type="success" plain icon="el-icon-refresh">
              {{$t('DefaultButton.refreshButtonText')}}
            </el-button>
          </el-col>
        </el-row>
      </section>

      <section class="content-container">
        <section class="echarts-container">
          <section id="myChart" style="width: 100%;height: 35rem"></section>
        </section>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="500"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    tooltip-effect="light" size="medium"
                    :default-sort="{prop: 'time', order: 'descending'}"
                    ref="multipleTable">
            <el-table-column :label="$t('Switchgear.table.time')" prop="time" align="center" width="160"
                             show-overflow-tooltip sortable fixed></el-table-column>
            <el-table-column :label="$t('Switchgear.table.downtime')" prop="prevTime" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('Switchgear.table.duration')" prop="diffTime" align="center" width="90"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('Switchgear.table.status')" align="center" width="80"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.isOnLine === 0" class="text-success">{{$t('Switchgear.text.running')}}</span>
                <span v-else-if="scope.row.isOnLine === -1" class="text-error">{{$t('Switchgear.text.stop')}}</span>
              </template>
            </el-table-column>
          </el-table>

          <b-paging :pageIndex="queryPages.PageIndex"
                    :pageSize="queryPages.PageSize"
                    :total="totalCount"
                    layout="prev,next,jumper,sizes,total"
                    @pageSizeChange="handlePageSizeChange"
                    @currentPageChange="handlePageChange"></b-paging>
        </section>
      </section>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "@/utils/UtilsHelper"
  import {MethodsMixin, QueryParamsMixin} from "@common/mixin/mixin"
  import {ApolloMixin, DevicesTreeMixin} from "@/common/mixin/ApolloMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'
  import BPaging from '@components/basis/BPaging/index'

  export default {
    name: "Devices",
    mixins: [MethodsMixin, QueryParamsMixin, ApolloMixin, DevicesTreeMixin],
    components: {
      SelfTree,
      BPaging
    },
    methods: {
      handlePickerChange () {
        this.handleLoadAndQuery()
      },
      handleLoadAndQuery () {
        let _that = this
        _that.$axios.all([_that.handleLoadDevices(), _that.handleLoadDevicesRecent()])
          .then(() => {

          })
      },
      handleLoadDevicesRecent () {
        let _that = this

        let params = Object.assign({}, {Id: _that.deviceUid, recordNum: 10})

        if (_that.timeRange !== "" && _that.timeRange != null) {
          params = Object.assign({}, params, {
            startTime: formatDate(_that.timeRange[0], 'yyyy-MM-dd hh:mm:ss'),
            endTime: formatDate(_that.timeRange[1], 'yyyy-MM-dd hh:mm:ss')
          })
        }

        _that.$fetch(`/SwitchGear/DevicesRecent`, params)
          .then((ret) => {
            let retData = ret.data

            let title = []
            let status = []

            retData.forEach((item) => {
              title.unshift(formatDate(item.time, "hh:mm:ss"))
              status.unshift(item.isOnLine)
            })

            _that.title = title
            _that.status = status

            _that.handleChartOptions()
          })
      },
      handleLoadDevices () {
        let _that = this

        let params = Object.assign({}, _that.queryPages, {UID: _that.deviceUid})

        if (_that.timeRange !== "" && _that.timeRange != null) {
          params = Object.assign({}, params, {
            startTime: formatDate(_that.timeRange[0], 'yyyy-MM-dd hh:mm:ss'),
            endTime: formatDate(_that.timeRange[1], 'yyyy-MM-dd hh:mm:ss')
          })
        }

        _that.$fetch('/SwitchGear/Devices', params)
          .then((ret) => {
            let retData = ret.data

            _that.dataCollection = retData.items
            _that.totalCount = retData.totalCount
          })
      },
      handleChartOptions () {
        let _that = this
        let myChart = _that.$echarts.init(document.getElementById('myChart'))

        myChart.clear()

        myChart.setOption({
          title: {
            text: _that.$t('Switchgear.text.title'),
            left: '50%',
            textStyle: {
              fontSize: 14,
              color: '#4A5B79',
              fontWeight: 'none'
            }
          },
          legend: {
            bottom: 0,
            itemGap: 20
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
              let tipTemp = ''

              params.forEach((item) => {
                let marker = item.marker
                let seriesName = item.seriesName
                let value = item.value
                let axisValue = item.axisValue

                tipTemp += `${axisValue}&nbsp;<br/>&nbsp;${marker}${seriesName}：${value === 0 ? _that.$t('Switchgear.text.running') : _that.$t('Switchgear.text.stop')}&nbsp;&nbsp;<br/><br/>`
              })

              return tipTemp
            },
            // formatter: '{b}<br/>{a0}：{c0}<br/>{a1}：{c1}<br/>{a2}：{c2}',
            textStyle: {
              fontSize: 12
            }
          },
          toolbox: {
            left: 20,
            itemGap: 20,
            feature: {
              dataView: {
                title: _that.$t('ECharts.toolbox.dataView.title'),
                lang: [_that.$t('ECharts.toolbox.dataView.title'), _that.$t('ECharts.toolbox.dataView.close'), _that.$t('ECharts.toolbox.dataView.refresh')],
                readOnly: true
              },
              saveAsImage: {
                title: _that.$t('ECharts.toolbox.saveAsImage.title'),
                pixelRatio: 2
              }
            }
          },
          xAxis: {
            data: _that.title
          },
          yAxis: {
            name: _that.$t('Switchgear.text.statusValue'),
            nameLocation: 'middle',
            nameGap: 35,
            minInterval: 1
          },
          series: [
            {
              type: 'line',
              step: 'end',
              name: _that.$t('Switchgear.text.runStatus'),
              symbol: 'rect',
              symbolSize: 6,
              data: _that.status,
              lineStyle: {
                color: '#409EFF'
              },
              itemStyle: {
                color: '#409EFF'
              }
            }
          ]
        })
      }
    },
    created () {
      let _that = this

      _that.$nextTick(() => {
        if (_that.leftDevicesTree.length <= 0) {
          _that.handleLoadDevicesTree()
        }
      })
    },
    data () {
      return {
        title: [],
        status: []
      }
    }
  }
</script>

<style type="text/css" scoped>

  .right-wrapper-container >>> .content-container .echarts-container {
    margin-top: 1rem;
    width: calc(100% - 32rem);
  }

  .right-wrapper-container >>> .content-container .table-container {
    margin-top: 1rem;
    width: 32rem;
  }

  .right-wrapper-container >>> .content-container {
    height: 100%;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
  }

  .switchgear-wrapper-container {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  }

  .tree-module-wrapper-container {
    width: 15rem;
    height: 40rem;
    margin-right: 1rem;
  }
</style>
