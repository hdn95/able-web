<!--设备列表页面-->

<template>
  <section>
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>

            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Device.search.name')" value="DeviceAlias"></el-option>
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

    <section class="content-box-container">
      <fun-button-group :funs="$route.meta.funs"
                        @refreshEmit="handleLoadAndQuery"
                        @addEmit="handleAdd"
                        @editEmit="handleEdit"
                        @deletedEmit="handleDeleted">

        <template slot="leftOperate">
          <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                     v-if="(funItem.attributeC ==='JsEvent' && funItem.attributeValueC === 'export')"
                     :type="funItem.cssName" plain :icon="funItem.img" @click="handleDeviceExport(funItem.value)">
            {{$t('DefaultButton.export')}}
          </el-button>

          <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                     v-if="(funItem.attributeC ==='JsEvent' && funItem.attributeValueC === 'import')"
                     :type="funItem.cssName" plain :icon="funItem.img" @click="handleDeviceImport(funItem.value)">
            {{$t('DefaultButton.import')}}
          </el-button>
        </template>

        <template slot="rightOperate">
          <el-radio-group v-model="displayMode" size="small" fill="#4A5B79">
            <el-radio-button label="list"><i class="el-icon-ump-list"></i></el-radio-button>
            <el-radio-button disabled label="card"><i class="el-icon-ump-graphic"></i></el-radio-button>
          </el-radio-group>
        </template>
      </fun-button-group>

      <transition name="fade" mode="out-in">
        <section key="list" v-if="displayMode.indexOf('list')>-1">
          <b-devices :dataCollection="dataCollection" @selectionChange="handleSelectionChange"></b-devices>
        </section>

        <section key="card" v-else>
          <b-devices-card :dataCollection="dataCollection"></b-devices-card>
        </section>
      </transition>

      <b-paging :pageIndex="queryPages.PageIndex"
                :pageSize="queryPages.PageSize"
                :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-device-new :isVisible="newDialog.isVisible"
                  :requestUri="newDialog.requestUri"
                  @saveRefresh="handleRefresh"
                  @closeDialog="newDialog.isVisible = false"></b-device-new>
    <b-device-edit :isVisible="editDialog.isVisible"
                   :requestUri="editDialog.requestUri"
                   :formObject="editDialog.editForm"
                   @saveRefresh="handleRefresh"
                   @closeDialog="editDialog.isVisible = false"></b-device-edit>
    <b-import :isVisible="importDialog.isVisible"
              :requestUri="importDialog.requestUri"
              @closeDialog="importDialog.isVisible = false"></b-import>
  </section>
</template>

<script>
  import {QueryParamsMixin, MethodsMixin} from "@/common/mixin/mixin"
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BDevices from '@components/Device/BDevice/DeviceList'
  import BDevicesCard from '@components/Device/BDevice/DeviceCard'
  import BPaging from '@components/basis/BPaging/index'
  import BImport from '@components/Device/BDevice/Import'
  import BDeviceNew from '@components/Device/BDevice/DeviceNew'
  import BDeviceEdit from '@components/Device/BDevice/DeviceEdit'

  export default {
    name: "Devices",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BDeviceNew,
      BDeviceEdit,
      BImport,
      BPaging,
      BDevices,
      BDevicesCard,
      FunButtonGroup
    },
    methods: {
      handleDeviceExport () {
        let _that = this

        const temp = _that.multipleSelection

        const keyIds = []

        if (_that.multipleSelection.length > 0) {
          temp.forEach((item) => {
            keyIds.push(item.uid)
          })
        }
        _that.$fetch(`/Device/Export`,
          Object.assign({}, _that.queryParams, _that.queryPages, {UID: keyIds.join(',')}))
          .then((ret) => {
            const retData = ret.data

            const elemIF = document.createElement("iframe")
            elemIF.src = retData
            elemIF.style.display = "none"
            document.body.appendChild(elemIF)
          })
      },
      handleDeviceImport (event) {
        this.importDialog = {
          isVisible: true,
          requestUri: event
        }
      },
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
      }
    },
    created () {
      this.$nextTick(() => {
        this.handleLoadAndQuery()
      })
    },
    data () {
      return {
        importDialog: {
          isVisible: false,
          requestUri: ''
        },
        displayMode: 'list',
        querySearchKey: '',
        queryType: 'DeviceAlias',
        queryParams: {
          DeviceAlias: ''
        }
      }
    }

  }
</script>

<style type="text/css" scoped>

</style>
