<!--首页地图展示组件-->

<template>
  <section>
    <section class="bm-container">
      <section class="control-wrapper-container">
        <section style="margin: 0 1rem 0 0">
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
        </section>
      </section>

      <section class="map-container">
        <baidu-map class="bm-view" :center="mapOptions.center" :zoom="mapOptions.mapZoom" :scroll-wheel-zoom="true"
                   :mapStyle="mapStyle">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" :enableGeolocation="true" :showZoomInfo="true"></bm-navigation>

          <bml-marker-clusterer :averageCenter="true">
            <bm-marker v-for="(marker,index) of mapDevices" :key="index"
                       :position="{lng: marker.lng, lat: marker.lat}"
                       :icon="mapOptions.icon"
                       @click="handleClickMarker($event, marker)">

              <bm-label :content="marker.uName" :labelStyle="labelStyle" :offset="{width: 27, height: -7}"></bm-label>
            </bm-marker>
          </bml-marker-clusterer>

        </baidu-map>
      </section>
    </section>

    <b-motorstatus :isVisible="dialogStatus.isVisible"
                   :formObject="dialogStatus.formObject"
                   @close="dialogStatus.isVisible = false">
    </b-motorstatus>
  </section>
</template>

<script>
  import SelfTree from '@components/basis/BTree/SelfTree'
  import {DevicesTreeMixin} from "@/common/mixin/ApolloMixin"
  import {BmlMarkerClusterer} from 'vue-baidu-map'
  import {mapGetters} from 'vuex'
  import BMotorstatus from '@components/basis/BApollo/MotorStatus'

  export default {
    name: "MotorMap",
    mixins: [DevicesTreeMixin],
    components: {
      BmlMarkerClusterer,
      BMotorstatus,
      SelfTree
    },
    computed: {
      ...mapGetters({
        mapDevices: 'MapDevices'
      })
    },
    methods: {
      handleNodeClick (event) {
        let _that = this

        switch (event.sort) {
          case "SensorDevice": {

            _that.mapOptions.mapZoom = 10
            _that.mapOptions.center = {lng: event.lng, lat: event.lat}

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
      handleClickMarker (event, marker) {
        this.openStatus(marker)
      },
      openStatus (event) {
        this.dialogStatus = {
          isVisible: true,
          formObject: event
        }
      }
    },
    data () {
      return {
        dialogStatus: {
          isVisible: false,
          formObject: {}
        },
        labelStyle: {
          boxShadow: '.3rem .1rem .3rem #8a8a8a',
          borderRadius: '50px',
          padding: '.5rem 1rem .5rem 1rem',
          borderColor: '#fff',
          color: '#000',
          fontSize: '.875rem'
        },
        mapOptions: {
          mapZoom: 5,
          center: {
            lng: 116.413,
            lat: 39.921
          },
          icon: {
            url: 'https://able.gosafenet.com/images/blue_wz.png',
            size: {width: 32, height: 32}
          },
          red_icon: {
            url: 'https://able.gosafenet.com/images/red_wz.png',
            size: {width: 32, height: 32}
          }
        },
        mapStyle: {
          styleJson: [
            {
              "featureType": "road",
              "elementType": "all",
              "stylers": {
                "visibility": "off"
              }
            },
            {
              "featureType": "poilabel",
              "elementType": "all",
              "stylers": {
                "visibility": "off"
              }
            },
            {
              "featureType": "boundary",
              "elementType": "geometry.stroke",
              "stylers": {
                "color": "#000000ff"
              }
            },
            {
              "featureType": "manmade",
              "elementType": "all",
              "stylers": {
                "visibility": "off"
              }
            },
            {
              "featureType": "manmade",
              "elementType": "all",
              "stylers": {
                "visibility": "off"
              }
            }
          ]
        }
      }
    },
    created () {
      this.$nextTick(() => {
        if (this.leftDevicesTree.length <= 0) {
          this.handleLoadDevicesTree()
        }
      })
    }
  }
</script>

<style type="text/css" scoped>
  .bm-container >>> .map-container {
    width: calc(100% - 16rem);
  }

  .bm-container >>> .tree-module-wrapper-container {
    width: auto;
    height: 40rem;
  }

  .bm-container {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  }

  .bm-view {
    height: 40rem;
  }

  .bm-container >>> .control-wrapper-container {
    background-color: #ffffff;
    height: 40rem;
    width: 16rem;
    overflow-y: auto;
  }

  .control-wrapper-container >>> .item-wrapper-container {
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    padding-top: .7rem;
    padding-bottom: .7rem;
    cursor: pointer;
    border-bottom: 1px solid #E4E7ED;
  }

  .control-wrapper-container >>> .item-wrapper-container:hover .title {
    color: #F56C6C;
  }
</style>
