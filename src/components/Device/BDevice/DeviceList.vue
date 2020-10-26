<template>
  <section class="table-container">
    <el-table border :data="dataCollection" max-height="420"
              header-row-class-name="table-header-row-class"
              class="cus-table"
              tooltip-effect="light" size="medium"
              @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column :label="$t('Device.table.uid')" prop="uid" align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column :label="$t('Device.table.name')" prop="device_Alias" align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column :label="$t('Device.table.type')" align="center" width="200"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.deviceTypeName}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('Device.table.qrCode')" align="center" width="130">
        <template slot-scope="scope">
          <el-button @click="showDeviceQRCode(scope.row.uid)" type="text">{{$t('Device.text.qrCode')}}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Device.table.enable')" width="90" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.enabledMark === 1" class="text-success">{{$t('Device.text.enable')}}</span>
          <span v-else class="text-error">{{$t('Device.text.disable')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Device.table.deleted')" width="90" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.deleteMark === 0" class="text-success">{{$t('Device.text.notDelete')}}</span>
          <span v-else class="text-error">{{$t('Device.text.deleted')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Device.table.creationTime')" align="center">
        <template slot-scope="scope">{{scope.row.createDate | tDateConvert}}</template>
      </el-table-column>
      <el-table-column :label="$t('Device.table.remark')" prop="remark" align="left"
                       header-align="center" show-overflow-tooltip></el-table-column>

      <el-table-column fixed="right" :label="$t('Device.text.operating')">
        <template slot-scope="scope">
          <el-button @click="handleShutDown(scope.row)" icon="el-icon-remove" type="info">
            {{$t('Device.text.shutDown')}}
          </el-button>

          <el-dropdown style="margin-left: 1rem;" trigger="click">
            <section style="color: #409EFF;cursor: pointer;">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </section>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleChangePwd(scope.row)">
                <i class="el-icon-circle-check-outline"></i> {{$t('Device.text.changePwd')}}
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleGetRandomCode(scope.row)">
                <i class="el-icon-ump-password"></i>
                {{$t('Device.text.randomCode')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible="isVisible"
      @close="isVisible = false"
      width="30%">
      <section slot="title">{{$t('Device.table.qrCode')}}</section>
      <section class="qrcode-container">
        <section id="qrcode"></section>
        <section style="margin-top: .5rem">UID：{{currentKey}}</section>
      </section>
    </el-dialog>

    <b-change-pwd :is-visible="changePwd.isVisible"
                  :device-id="changePwd.deviceId"
                  @close="changePwd.isVisible = false"></b-change-pwd>
  </section>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "@/utils/UtilsHelper"
  import QRCode from 'qrcodejs2'
  import BChangePwd from '@components/Device/BDevice/ChangePwd'

  export default {
    name: "DeviceList",
    props: {
      dataCollection: {
        type: Array
      }
    },
    components: {
      BChangePwd
    },
    filters: {
      tDateConvert: function (val) {
        return formatDate(val, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      // 更改密码
      handleChangePwd (event) {
        this.changePwd = {
          isVisible: true,
          deviceId: event.id
        }
      },
      showDeviceQRCode (uid) {
        const _that = this

        const key = uid
        this.isVisible = true
        this.currentKey = uid

        _that.$nextTick(() => {
          document.getElementById("qrcode").innerHTML = ''

          const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: key,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          })
        })
      },
      handleSelectionChange (val) {
        this.$emit('selectionChange', val)
      },

      // 关机
      handleShutDown (event) {
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
              id: event.id
            })
              .then((ret) => {
                setTimeout(() => {
                  _that.shutDown(event.id)
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
      shutDown (id) {
        const _that = this

        _that.$fetch(`/Settings/Boards/ShutDown/${id}`)
          .then((ret) => {
            _that.$message({
              message: `${_that.$t('DefaultTips.successText')}`,
              type: 'success',
              duration: 1800
            })
          })
      },

      // 获取随机码
      handleGetRandomCode (event) {
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

            _that.$fetch(`/Settings/Boards/DeviceRandomCode`, {
              devicePassword: pwd,
              Id: event.id
            })
              .then((ret) => {
                this.$notify({
                  dangerouslyUseHTMLString: true,
                  type: 'success',
                  title: '随机码获取成功',
                  message: `设备${event.device_Alias}的随机码是：<strong>${ret.data}</strong>`,
                  duration: 0
                })
              })
              .catch(() => {
              })
          })
          .catch(() => {

          })
      }
    },
    data () {
      return {
        changePwd: {
          isVisible: false,
          deviceId: ''
        },
        currentKey: '',
        isVisible: false
      }
    }
  }
</script>

<style type="text/css" scoped>

  .qrcode-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
