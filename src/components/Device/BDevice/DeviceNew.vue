<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog" width="55%">
      <section slot="title">{{$t('DefaultTips.addDataTitle')}}</section>

      <section class="dialog-boday">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="($t('DefaultTips.basicInformation'))" name="basicdata">
            <section class="module-wrapper-container">
              <section class="tree-module-wrapper-container" v-loading="treeLoading">
                <section class="title-module-wrapper-container">
                  <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

                  <section class="right-title-module">
                    <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                       @click="handleLoadAllDeviceType"></i>
                  </section>
                </section>

                <section style="margin-top: 1rem">
                  <self-tree :jsonData="deviceTypeJsonTree" :treeProps="treeProps" @nodeClick="handleNodeClick"
                             style="margin-top: .35rem"></self-tree>
                </section>
              </section>

              <section class="form-module-wrapper-container">
                <section class="title-module-wrapper-container">
                  <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
                </section>

                <section class="content-wrapper-container">
                  <el-form ref="formDevice" :model="formObject" :rules="formRules" label-position="top">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('Device.table.type')" prop="deviceTypeId" ref="deviceTypeId">
                          <el-input v-model="formParentText" type="text" :readonly="true"
                                    :placeholder="$t('Device.placeholder.type')"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('Device.table.uid')" prop="uid">
                          <el-input type="text" v-model="formObject.uid"
                                    :placeholder="$t('Device.placeholder.uid')"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('Device.table.name')" prop="device_Alias">
                          <el-input type="text" v-model="formObject.device_Alias"
                                    :placeholder="$t('Device.placeholder.name')"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('Device.table.productionDate')">
                          <el-date-picker type="date" v-model="formObject.productionDate"
                                          :editable="false"
                                          :placeholder="$t('Device.placeholder.productionDate')"
                                          style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('Device.table.activationDate')">
                          <el-date-picker type="date" v-model="formObject.activationDate"
                                          :editable="false"
                                          :placeholder="$t('Device.placeholder.activationDate')"
                                          :picker-options="pickerOptions"
                                          style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item :label="$t('Device.text.setting')">
                          <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                            {{$t('Device.table.enable')}}
                          </el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="16">
                        <el-form-item :label="$t('Device.table.remark')">
                          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formObject.remark"
                                    :placeholder="$t('Device.placeholder.remark')">
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </section>
              </section>
            </section>
          </el-tab-pane>
          <el-tab-pane :label="($t('DefaultTips.location'))" name="coordinate">
            <section>
              <section v-if="!retLoc">
                <section class="bmap-container">
                  <section class="search-container">
                    <el-input :placeholder="$t('DefaultTips.searchPlaceholder')"
                              prefix-icon="el-icon-search"
                              v-model="locQueryKey"
                              :clearable="false"></el-input>

                    <section class="ret-container">
                      <template v-for="item in locSearchRet">
                        <section :key="item.uid" class="ret-item-container">
                          <section class="title" @click="handleRetItemClick(item)">{{item.title}}</section>
                          <section class="address">{{item.address}}</section>
                        </section>
                      </template>
                    </section>
                  </section>

                  <section class="bm-view-container">
                    <section id="bmapContainer" class="bm-view"></section>
                    <section class="other-tips"><label style="color: #F56C6C;">*</label>{{$t('DefaultTips.selectLocation')}}
                    </section>
                  </section>
                </section>
              </section>

              <section v-else class="retloc-container">
                <section class="retloc-item-container">
                  <label><i class="el-icon-ump-loc" style="font-size: 1.3rem"></i></label>
                  <label style="margin-left: .5rem">{{retLoc.address}}</label>
                </section>

                <section class="retloc-item-container">
                  <label><i class="el-icon-ump-zuobiao" style="font-size: 1.3rem"></i></label>
                  <label style="margin-left: .5rem">{{retLoc.point.lng}}，{{retLoc.point.lat}}</label>
                </section>

                <section class="retloc-item-container">
                  <el-button @click="handleReselectLoc">{{$t('DefaultButton.reselect')}}</el-button>
                </section>
              </section>
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSave('formDevice')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script>
  import {DeviceMixin} from "@/components/Device/BDevice/mixin/DeviceMixin"
  import {formatDate} from "../../../utils/UtilsHelper"

  export default {
    name: "DeviceNew",
    mixins: [DeviceMixin],
    watch: {
      'locQueryKey' (newVal, oldVal) {
        this.handleSearchLoc()
      }
    },
    methods: {
      initBMap () {
        let _that = this

        _that.$nextTick(() => {
          let bmap = new BMap.Map(document.getElementById('bmapContainer'))

          bmap.centerAndZoom(new BMap.Point(116.413, 39.921), 4)
          _that.bmap = bmap

          bmap.enableScrollWheelZoom(true)

          let geolocation = new BMap.Geolocation()

          geolocation.getCurrentPosition(function (ret) {
            if (this.getStatus() === BMAP_STATUS_SUCCESS) {
              let mkIcon = new BMap.Icon('https://able.gosafenet.com/images/red_wz.png', new BMap.Size(32, 32))

              let marker = new BMap.Marker(ret.point, {
                icon: mkIcon
              })

              bmap.addOverlay(marker)
              bmap.centerAndZoom(ret.point, 15)

              _that.point = ret.point
            } else {

            }
          })
        })
      },
      handleSearchLoc () {
        let _that = this
        let point = _that.point || new BMap.Point(116.413, 39.921)

        let options = {
          pageCapacity: 20,
          onSearchComplete: function (ret) {

            if (localSearch.getStatus() === BMAP_STATUS_SUCCESS) {
              let temp = []

              for (let i = 0; i < ret.getCurrentNumPois(); i++) {
                let poi = ret.getPoi(i)

                temp.push(poi)
              }

              _that.bmap.clearOverlays()

              temp.forEach((item) => {
                let mkIcon = new BMap.Icon('https://able.gosafenet.com/images/blue_wz.png', new BMap.Size(32, 32))

                let marker = new BMap.Marker(item.point, {
                  icon: mkIcon
                })
                _that.bmap.addOverlay(marker)

                let label = new BMap.Label(item.title, {offset: new BMap.Size(28, -3)})

                label.setStyle({
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxShadow: '.3rem .1rem .3rem #8a8a8a',
                  borderRadius: '50px',
                  padding: '.5rem 1rem .5rem 1rem',
                  borderColor: '#fff',
                  color: '#000',
                  fontSize: '.875rem'
                })

                marker.setLabel(label)

                _that.handleMarkerAddClick(item, marker)
              })

              _that.bmap.centerAndZoom(temp[0].point, 18)

              _that.locSearchRet = temp
            }
          }
        }

        let localSearch = new BMap.LocalSearch(point, options)
        localSearch.search(_that.locQueryKey)
      },
      handleMarkerAddClick (content, marker) {
        let _that = this

        marker.addEventListener('click', function (e) {
          _that.handleMarkerClick(content, e)
        })
      },
      handleMarkerClick (content, event) {
        let _that = this

        this.retLoc = content
      },
      handleRetItemClick (event) {
        let _that = this

        _that.bmap.centerAndZoom(event.point, 50)
      },
      handleSave (formName) {
        let _that = this

        _that.$refs[formName].validate((valid) => {
          if (valid) {
            if (_that.retLoc) {
              _that.formObject.longitude = _that.retLoc.point.lng
              _that.formObject.latitude = _that.retLoc.point.lat
            }
            _that.formObject.productionDate = formatDate(_that.formObject.productionDate, 'yyyy-MM-dd hh:mm:ss')
            _that.formObject.activationDate = formatDate(_that.formObject.activationDate, 'yyyy-MM-dd hh:mm:ss')
            _that.$post(_that.requestUri, _that.formObject)
              .then(() => {
                this.$emit('saveRefresh', true)
              })
              .catch(() => {
              })
          } else {
            return false
          }
        })
      },
      handleOpenDialog () {
        let _that = this
        _that.initBMap()

        if (_that.deviceTypeJsonTree.length <= 0) {
          _that.handleLoadAllDeviceType()
        }
      },
      handleReselectLoc () {
        this.locSearchRet = []
        this.locQueryKey = ''
        this.retLoc = ''

        this.initBMap()
      }
    },
    data () {
      return {
        locSearchRet: [],
        locQueryKey: '',
        formObject: {}
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday >>> .retloc-container .retloc-item-container:not(:last-child) {
    margin-bottom: .8rem;
  }

  .dialog-boday >>> .retloc-container .retloc-item-container {
    display: flex;
    display: -webkit-flex;
    display: -o-flex;
    display: -ms-flex;
    align-items: center;
  }

  .dialog-boday >>> .retloc-container {

  }

  .tree-module-wrapper-container {
    width: 20%;
  }

  .form-module-wrapper-container .content-wrapper-container {
    margin-top: 0rem;
  }

  .dialog-boday {
    height: 30rem;
  }

  .search-container >>> .ret-container .ret-item-container:hover .title {
    color: #F56C6C;
  }

  .search-container >>> .ret-container .ret-item-container .title {
    color: #303133;
    font-size: .875rem;
    cursor: pointer;
  }

  .search-container >>> .ret-container .ret-item-container .address {
    color: #909399;
    font-size: .8125rem;
    margin-top: .3rem;
  }

  .search-container >>> .ret-container .ret-item-container {
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    padding: .7rem 0rem .7rem 0rem;
    border-bottom: 1px solid #E4E7ED;
  }

  .bmap-container >>> .search-container .ret-container {
    width: 100%;
    margin-top: .5rem;
    height: 23rem;
    overflow-y: auto;
  }

  .bmap-container >>> .search-container {
    width: 15rem;
    margin-right: .5rem;
  }

  .bmap-container >>> .bm-view-container .other-tips {
    font-size: .75rem;
    margin-top: .3rem;
    color: #C0C4CC;
  }

  .bmap-container >>> .bm-view-container {
    width: calc(100% - 15rem);
  }

  .bmap-container {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
  }

  .bm-view {
    height: 25rem;
  }
</style>
