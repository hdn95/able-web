<template>
  <section class="device-card-wrapper-container card-wrapper-container">
    <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
      <el-row :gutter="24">
        <el-col :span="6" style="padding-bottom: 1.25rem" :key="index" v-for="(item,index) in dataCollection">
          <el-card shadow="always">
            <section slot="header">
              <section class="card-header-main-title-container">
                <section class="title-left-container">{{item.device_Alias}}</section>
                <section>
                  <!--<el-checkbox :label="item.uid"></el-checkbox>-->
                </section>
              </section>
              <section class="card-header-assist-title-container">{{$t('Device.table.uid')}}：{{item.uid}}</section>
            </section>

            <section class="card-content-container">
              <section class="content-left-container">
                <img src="../../../assets/123800089.jpg" :alt="item.device_Alias" style="width: 100%"/>
              </section>

              <section class="content-right-container">
                <section class="detail-item">
                  <section class="detail-item-left">{{$t('Device.table.type')}}：</section>
                  <section class="detail-item-right">{{item.deviceTypeName}}</section>
                </section>

                <section class="detail-item">
                  <section class="detail-item-left">{{$t('Device.table.enable')}}：</section>
                  <section class="detail-item-right">
                    <span v-if="item.enabledMark === 1" class="text-success">{{$t('Device.text.enable')}}</span>
                    <span v-else class="text-error">{{$t('Device.text.disable')}}</span>
                  </section>
                </section>

                <section class="detail-item">
                  <section class="detail-item-left">{{$t('Device.table.deleted')}}：</section>
                  <section class="detail-item-right">
                    <span v-if="item.deleteMark === 0" class="text-success">{{$t('Device.text.notDelete')}}</span>
                    <span v-else class="text-error">{{$t('Device.text.deleted')}}</span>
                  </section>
                </section>

                <section class="detail-item">
                  <section class="detail-item-left">{{$t('Device.table.creationTime')}}：</section>
                  <section class="detail-item-right">{{item.createDate | tDateConvert}}</section>
                </section>

                <section class="detail-item">
                  <section class="detail-item-left">{{$t('Device.table.remark')}}：</section>
                  <section class="detail-item-right">{{item.remark}}</section>
                </section>
              </section>
            </section>
          </el-card>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </section>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "@/utils/UtilsHelper"

  export default {
    name: "DeviceCard",
    props: {
      dataCollection: {
        type: Array
      }
    },
    data () {
      return {
        checkList: []
      }
    },
    methods: {
      handleCheckedChange (event) {
        this.$emit('checkedChange', event)
      }
    },
    filters: {
      tDateConvert (val) {
        return formatDate(val, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style type="text/css" scoped>
  .device-card-wrapper-container >>> .content-right-container .detail-item .detail-item-left {
    width: 35%;
    text-align: right;
  }

  .device-card-wrapper-container >>> .content-right-container .detail-item .detail-item-right {
    width: 65%;
  }

  .device-card-wrapper-container >>> .content-right-container .detail-item {
    height: 1.3rem;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 .8rem 0 .8rem;
  }

  .device-card-wrapper-container >>> .el-card__header {
    padding: 10px 20px;
  }

  .device-card-wrapper-container >>> .el-checkbox__label {
    display: none;
  }

  .device-card-wrapper-container {
    margin: 1rem 0 1rem 0;
  }
</style>
