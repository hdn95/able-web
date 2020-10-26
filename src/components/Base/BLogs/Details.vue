<template>
  <el-dialog :visible="isVisible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @close="handleCloseDialog"
             @open="handleOpenDialog" width="60%">
    <section slot="title">{{$t('DefaultTips.detailDataTitle')}}</section>

    <section class="dialog-boday">
      <section class="content-wrapper-container">
        <section class="title-module-wrapper-container">
          <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
        </section>

        <section class="detail-form-wrapper-container">
          <el-row class="detail-el-row">
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.operateType')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.operateType">{{detailObject.operateType}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.ipAddress')}}：</section>
                <section class="right-content">
                  <span
                    v-if="detailObject.remoteIPAddress">{{detailObject.remoteIPAddress}}:{{detailObject.remotePort}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.hostPort')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.remotePort">{{detailObject.hostPort}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
          </el-row>

          <el-row class="detail-el-row">
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.operator')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.operaterAccount">{{detailObject.operaterName}}({{detailObject.operaterAccount}})</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.requestUrl')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.requestURL">{{detailObject.requestURL}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.requestMethod')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.requestMethodDesc">{{detailObject.requestMethodDesc}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
          </el-row>

          <el-row class="detail-el-row">
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.requestTime')}}：</section>
                <section class="right-content">{{detailObject.operateDateTime | formatDate}}</section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.responseTime')}}：</section>
                <section class="right-content">{{detailObject.responseTime | formatDate}}</section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.isException')}}：</section>
                <section class="right-content">
                  <section>
                    <span
                      :class="detailObject.isException ? 'text-error' : 'text-success' ">{{detailObject.isException}}</span>
                  </section>

                  <section v-if="detailObject.isException">
                    <el-tooltip effect="dark" :content="detailObject.exceptionMessage" placement="top">
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </section>
                </section>
              </section>
            </el-col>
          </el-row>

          <el-row class="detail-el-row">
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.headerAccept')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.headerAccept">{{detailObject.headerAccept}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.headerContentType')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.headerContentType">{{detailObject.headerContentType}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>

            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.browser')}}：</section>
                <section class="right-content">
                  <section>
                    <el-tooltip effect="dark" :content="detailObject.browser" placement="top-start">
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </section>
                </section>
              </section>
            </el-col>
          </el-row>

          <el-row class="detail-el-row">
            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.returnCode')}}：</section>

                <section class="right-content">
                  <section>{{detailObject.responseCode}}</section>

                  <section>
                    <el-tooltip effect="dark" :content="detailObject.responseMessage" placement="top-start">
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </section>
                </section>
              </section>
            </el-col>

            <el-col :span="8">
              <section class="detail-item-container">
                <section class="left-title">{{$t('Logs.table.ascriptionSystem')}}：</section>
                <section class="right-content">
                  <span v-if="detailObject.ascriptionSystemDesc">{{detailObject.ascriptionSystemDesc}}</span>
                  <span v-else>-</span>
                </section>
              </section>
            </el-col>
          </el-row>
        </section>
      </section>

      <section class="content-wrapper-container mpt2">
        <section class="title-module-wrapper-container">
          <section class="left-title-module">{{$t('Logs.tips.requestParameter')}}</section>
        </section>

        <section v-if="detailObject.requestParamter">
          <vue-json-pretty :data="detailObject.requestParamter | serialization" :showLength="true"
                           deep="0"></vue-json-pretty>
        </section>
      </section>

      <section class="content-wrapper-container mpt2">
        <section class="title-module-wrapper-container">
          <section class="left-title-module">{{$t('Logs.tips.responseData')}}</section>
        </section>

        <section v-if="detailObject.responseData">
          <vue-json-pretty :data="detailObject.responseData | serialization" :showLength="true"
                           deep="0"></vue-json-pretty>
        </section>
      </section>
    </section>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "@/utils/UtilsHelper"
  import VueJsonPretty from 'vue-json-pretty'

  export default {
    name: "Details",
    filters: {
      serialization (event) {
        return JSON.parse(event)
      },
      formatDate (event) {
        return formatDate(event, "yyyy-MM-dd hh:mm:ss")
      }
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      logsId: {
        type: String,
        required: true
      }
    },
    components: {
      VueJsonPretty
    },
    methods: {
      handleLoadDetail () {
        let _that = this

        _that.$fetch(`/Base/Logs/${_that.logsId}`, {})
          .then((ret) => {
            const retData = ret.data

            _that.detailObject = retData
          })
          .catch(() => {
          })
      },
      handleCloseDialog () {
        this.$emit('closeDialog')

        this.$nextTick(() => {
          this.detailObject = ""
        })
      },
      handleOpenDialog () {
        this.handleLoadDetail()
      }
    },
    data () {
      return {
        detailObject: ""
      }
    }
  }
</script>

<style type="text/css" scoped>

</style>
