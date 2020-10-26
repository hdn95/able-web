<!--电机数据电压页面-->
<template>
  <section class="a_view-wrapper-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadDevicesTree"></i>
        </section>
      </section>

      <self-tree :jsonData="leftDevicesTree" :treeProps="treeProps"
                 :defaultExpandAll="true" style="margin-top:.5rem"
                 @nodeClick="handleNodeClick"></self-tree>
    </section>

    <section class="right-wrapper-container">
      <section class="title-module-wrapper-container" style="margin-bottom: .8rem">
        <section class="left-title-module">当前设备
          <span v-if="currentDevice">（{{currentDevice.uName}}）</span>
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
            <el-table-column :label="$t('Voltage.table.create')" prop="time" align="center" width="200"
                             show-overflow-tooltip sortable></el-table-column>
            <el-table-column :label="$t('Voltage.table.aPhase')" prop="resultA" align="center" width="100"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('Voltage.table.bPhase')" prop="resultB" align="center" width="100"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('Voltage.table.cPhase')" prop="resultC" align="center" width="100"
                             show-overflow-tooltip></el-table-column>
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
  import {WebSocketMixin} from "@/common/mixin/WebSocketMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'
  import BPaging from '@components/basis/BPaging/index'

  export default {
    name: "Voltages",
    mixins: [MethodsMixin, QueryParamsMixin, ApolloMixin, DevicesTreeMixin, WebSocketMixin],
    components: {
      SelfTree,
      BPaging
    },
    methods: {
      handleWebSocketOnMessage (event) {
        let _that = this
        let rt = JSON.parse(event.data)
        let retData = JSON.parse(rt.data)
        let ret = JSON.parse(retData.arguments[0])

        if (retData.arguments[0] !== 'CopyThat') {
          let args = []

          args[0] = `${rt.messageId}`
          args[1] = 'CopyThat'

          let sendData = {
            id: retData.id,
            methodName: retData.methodName,
            arguments: args
          }

          _that.handleWebSocketSend(sendData)
        }
        console.log(`电压Websocket中uid为：${ret.uid},用户选择的uid为：${_that.deviceUid}`)
        if (ret.uid === _that.deviceUid) {
          _that.title.push(formatDate(ret.datetime, "hh:mm:ss"))
          _that.APhase.push(ret.v_voltageU)
          _that.BPhase.push(ret.v_voltageV)
          _that.CPhase.push(ret.v_voltageW)

          _that.dataCollection.unshift({
            time: formatDate(ret.datetime, 'yyyy-MM-dd hh:mm:ss'),
            resultA: ret.v_voltageU,
            resultB: ret.v_voltageV,
            resultC: ret.v_voltageW
          })

          _that.totalCount = _that.totalCount + 1

          _that.setChartOptions()
        }else{
          console.log(`电压UID不相等，Websocket中uid为：${ret.uid},用户选择的uid为：${_that.deviceUid}`)
        }
      },
      handlePickerChange () {
        this.handleLoadAndQuery()
      },
      handleLoadAndQuery () {
        let _that = this

        let params = Object.assign({}, _that.queryPages, {UID: _that.deviceUid})

        if (_that.timeRange !== "" && _that.timeRange != null) {
          params = Object.assign({}, params, {
            startTime: formatDate(_that.timeRange[0], 'yyyy-MM-dd hh:mm:ss'),
            endTime: formatDate(_that.timeRange[1], 'yyyy-MM-dd hh:mm:ss')
          })
        }

        _that.$fetch(`${_that.$route.path}`, params)
          .then((ret) => {
            let retData = ret.data

            _that.dataCollection = retData.items
            _that.totalCount = retData.totalCount

            let title = []
            let APhase = []
            let BPhase = []
            let CPhase = []

            retData.items.forEach((item) => {
              title.unshift(formatDate(item.time, "hh:mm:ss"))
              APhase.unshift(item.resultA)
              BPhase.unshift(item.resultB)
              CPhase.unshift(item.resultC)
            })

            _that.title = title
            _that.APhase = APhase
            _that.BPhase = BPhase
            _that.CPhase = CPhase

            _that.handleChartOptions()
          })
          .catch(() => {
          })
      },
      handleChartOptions () {
        let _that = this

        if (_that.myChart === undefined) {
          _that.myChart = this.$echarts.init(document.getElementById('myChart'))
        }

        _that.myChart.clear()

        _that.setChartOptions()
      },
      setChartOptions () {
        let _that = this

        _that.myChart.setOption({
          title: {
            text: _that.$t('Voltage.text.title'),
            left: '50%',
            textStyle: {
              fontSize: 14,
              color: '#4A5B79',
              fontWeight: 'none'
            }
          },
          legend: {
            top: 28,
            itemGap: 20
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 50,
              end: 100
            }
          ],
          tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
              let tipTemp = ''

              params.forEach((item) => {
                let marker = item.marker
                let seriesName = item.seriesName
                let value = item.value
                let axisValue = item.axisValue

                tipTemp += `${axisValue}&nbsp;<br/>&nbsp;${marker}${seriesName}：${value}&nbsp;&nbsp;<br/><br/>`
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
            name: _that.$t('Voltage.text.yTitle'),
            nameLocation: 'middle',
            nameGap: 35
          },
          series: [
            {
              type: 'line',
              name: _that.$t('Voltage.table.aPhase'),
              symbol: 'rect',
              symbolSize: 6,
              smooth: true,
              data: _that.APhase,
              lineStyle: {
                color: '#4A5B79'
              },
              itemStyle: {
                color: '#4A5B79'
              }
            },
            {
              type: 'line',
              name: _that.$t('Voltage.table.bPhase'),
              symbol: 'triangle',
              symbolSize: 6,
              smooth: true,
              data: _that.BPhase,
              lineStyle: {
                color: '#000'
              },
              itemStyle: {
                color: '#000'
              }
            },
            {
              type: 'line',
              name: _that.$t('Voltage.table.cPhase'),
              symbol: 'circle',
              symbolSize: 6,
              smooth: true,
              data: _that.CPhase,
              lineStyle: {
                color: '#8BBC21'
              },
              itemStyle: {
                color: '#8BBC21'
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

        _that.handleGetWebSocketUri()
      })
    },
    data () {
      return {
        title: [],
        APhase: [],
        BPhase: [],
        CPhase: []
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

  .a_view-wrapper-container {
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
