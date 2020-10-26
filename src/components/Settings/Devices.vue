<!--电机参数历史设置页面-->

<template>
  <section>
    <section class="settings-devices-container">
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

      <section class="" style="width: 100%">
        <section class="title-module-wrapper-container">
          <section class="left-title-module">{{$t('SettingDevices.text.historySetting')}}
            <span v-if="currentDevice">（{{currentDevice.uName}}）</span>
          </section>
        </section>

        <section class="conditional-query-container" style="margin-top: .5rem">
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

            <el-col :span="5">
              <el-button type="danger" size="small" icon="el-icon-search">
                {{$t('DefaultButton.searchButtonText')}}
              </el-button>
            </el-col>
          </el-row>
        </section>

        <section class="content-box-container">
          <fun-button-group :funs="$route.meta.funs"
                            @refreshEmit="handleLoadAndQuery">

            <template slot="leftOperate">
              <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                         v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'modifySetting')"
                         :type="funItem.cssName" plain :icon="funItem.img"
                         @click="handleMoifySetting(funItem.value)">
                {{$t('SettingDevices.btn.modifySetting')}}
              </el-button>
              <el-button @click="handleReset" icon="el-icon-setting" type="info">{{$t('SettingDevices.btn.reset')}}
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
              <el-table-column :label="$t('SettingDevices.table.settingDate')" align="center"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.createDate | tDateConvert}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('SettingDevices.table.operator')" prop="modifyUserName" align="center"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column :label="$t('SettingDevices.table.result')" prop="setResult" align="center"
                               show-overflow-tooltip></el-table-column>
              <el-table-column :label="$t('SettingDevices.table.operating')" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                             v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'viewSetting')"
                             :type="funItem.cssName" plain :icon="funItem.img"
                             @click="handleViewSetting(scope.row)">
                    {{$t('SettingDevices.btn.views')}}
                  </el-button>

                  <el-button @click="handleRestoreHistory(scope.row)" icon="el-icon-setting" type="info">
                    {{$t('SettingDevices.btn.restore')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>

          <b-paging :pageIndex="queryPages.PageIndex"
                    :pageSize="queryPages.PageSize"
                    :total="totalCount"
                    @pageSizeChange="handlePageSizeChange"
                    @currentPageChange="handlePageChange"></b-paging>
        </section>
      </section>
    </section>

    <b-modify-setting :isVisible="modifySetting.isVisible"
                      :deviceId="modifySetting.deviceId"
                      :requestUri="modifySetting.requestUri"
                      @closeDialog="closeModifySetting"></b-modify-setting>

    <b-view-setting :is-visible="viewSetting.isVisible" 
                    :form-object="viewSetting.formObject"
                    @closeDialog="viewSetting.isVisible = false"></b-view-setting>
  </section>
</template>

<script>
  import {formatDate} from "@/utils/UtilsHelper"
  import BModifySetting from '@components/Settings/ModifySetting'
  import BViewSetting from '@components/Settings/ViewSetting'
  import SelfTree from '@components/basis/BTree/SelfTree'
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {ApolloMixin, DevicesTreeMixin} from "@/common/mixin/ApolloMixin"
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import {mapGetters} from 'vuex'

  export default {
    name: "Devices",
    mixins: [DevicesTreeMixin, ApolloMixin, QueryParamsMixin, MethodsMixin],
    components: {
      SelfTree,
      BPaging,
      FunButtonGroup,
      BModifySetting,
      BViewSetting
    },
    computed: {
      ...mapGetters({
        mapDevices: 'MapDevices'
      })
    },
    filters: {
      tDateConvert: function (val) {
        return formatDate(val, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      // 恢复出厂设置
      handleReset () {
        const _that = this

        if (_that.currentDevice === null) {
          _that.$message({
            message: `${_that.$t('SettingDevices.text.selectDevice')}`,
            type: 'error',
            duration: 1800
          })
          return
        }

        _that.$prompt('', _that.$t('SettingDevices.text.inputPwd'), {
          inputType: 'password',
          closeOnClickModal: false,
          inputPlaceholder: _that.$t('SettingDevices.text.password'),
          confirmButtonText: _that.$t('DefaultButton.confirmButtonText'),
          cancelButtonText: _that.$t('DefaultButton.cancelButtonText'),
          inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/,
          inputErrorMessage: _that.$t('SettingDevices.text.password')
        }).then(({value}) => {
          const pwd = _that.$md5(value)

          _that.$post(`/Settings/Boards/Security`, {
            securityType: 102,
            secretkey: pwd,
            id: _that.currentDevice.id
          })
            .then((ret) => {
              setTimeout(() => {
                this.reset()
              }, 800)
            })
            .catch(() => {
              _that.$message({
                message: `${_that.$t('SettingDevices.text.pwdError')}`,
                type: 'error',
                duration: 1800
              })
            })
        }).catch(() => {

        })
      },
      reset () {
        this.$fetch(`/Settings/Boards/Initial/${this.currentDevice.id}`)
          .then((ret) => {
            this.$message({
              message: `${this.$t('DefaultTips.successText')}，请重启电机后设置生效`,
              type: 'success',
              duration: 5000
            })

            this.handleLoadAndQuery()
          })
      },
      // 下发历史设置
      handleRestoreHistory (row) {
        const _that = this

        _that.$prompt('', _that.$t('SettingDevices.text.inputPwd'), {
          inputType: 'password',
          closeOnClickModal: false,
          inputPlaceholder: _that.$t('SettingDevices.text.password'),
          confirmButtonText: _that.$t('DefaultButton.confirmButtonText'),
          cancelButtonText: _that.$t('DefaultButton.cancelButtonText'),
          inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/,
          inputErrorMessage: _that.$t('SettingDevices.text.password')
        })
          .then(({value}) => {
            const pwd = _that.$md5(value)

            _that.$post(`/Settings/Boards/Security`, {
              securityType: 102,
              secretkey: pwd,
              id: row.id
            })
            .then((ret) => {
              setTimeout(() => {
                _that.restoreHistory(row.id)
              }, 800)
            })
            .catch(() => {
              _that.$message({
                message: `${_that.$t('SettingDevices.text.pwdError')}`,
                type: 'error',
                duration: 1800
              })
            })
          })
          .catch(() => {

          })
      },
      restoreHistory (id) {
        this.$fetch(`/Settings/Boards/DownSend/${id}`)
          .then((ret) => {
            this.$message({
              message: `${this.$t('DefaultTips.successText')}，请重启电机后设置生效`,
              type: 'success',
              duration: 5000
            })

            this.handleLoadAndQuery()
          })
      },

      handleMoifySetting (event) {
        let _that = this

        if (_that.currentDevice === null) {
          _that.$message({
            message: `${_that.$t('SettingDevices.text.selectDevice')}`,
            type: 'error',
            duration: 1800
          })
          return
        }

        _that.modifySetting = {
          isVisible: true,
          deviceId: _that.currentDevice.id,
          requestUri: event.substring(0, event.indexOf('{'))
        }
      },
      handlePickerChange () {
        this.handleLoadAndQuery()
      },
      handleLoadAndQuery () {
        let _that = this

        let params = Object.assign({}, _that.queryPages, {UID: _that.currentDevice.code})

        if (_that.timeRange !== "" && _that.timeRange !== null) {
          params = Object.assign({}, params, {

            startTime: formatDate(_that.timeRange[0], 'yyyy-MM-dd hh:mm:ss'),
            endTime: formatDate(_that.timeRange[1], 'yyyy-MM-dd hh:mm:ss')
          })
        }

        _that.$fetch(`${_that.$route.path}`, params)
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items

            console.log(res)
          })
          .catch(() => {

          })
      },
      handleNodeClick (event) {
        let _that = this

        switch (event.sort) {
          case "SensorDevice": {
            _that.currentDevice = event
            _that.handleLoadAndQuery()
            break
          }
          case "SensorType": {
            _that.$message({
              message: `${_that.$t('Apollo.tips.deviceClickError')}`,
              type: 'error',
              duration: 1800
            })
            break
          }
        }
      },
      handleViewSetting (event) {
        const o = {}
        for (const key in event) {
          const f = key.substring(0, 1).toUpperCase()
          const t = key.substring(1)

          const t_key = `${f}${t}`

          o[t_key] = event[key]
        }

        this.viewSetting = {
          isVisible: true,
          formObject: o
        }
      },
      closeModifySetting () {
        this.modifySetting.isVisible = false
        this.handleLoadAndQuery()
      }
    },
    data () {
      return {
        viewSetting: {
          isVisible: false,
          formObject: {}
        },
        modifySetting: {
          isVisible: false,
          deviceId: '',
          requestUri: ''
        },
        currentDevice: null
      }
    },
    created () {
      this.$nextTick(() => {
        if (this.leftDevicesTree.length <= 0) {
          // this.handleLoadDevicesTree()
        }
      })
    }
  }
</script>

<style type="text/css" scoped>

  .settings-devices-container {
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
