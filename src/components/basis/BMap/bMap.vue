<!--地图的组件-->
<template>
  <section class="bmap-container">
    <section class="search-container">
      <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" prefix-icon="el-icon-search"
                v-model="locQueryKey"
                :clearable="true"></el-input>

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
      <section class="other-tips"><label style="color: #F56C6C;">*</label>{{$t('DefaultTips.selectLocation')}}</section>
    </section>
  </section>
</template>

<script>
  export default {
    props: {
      needCurrent: {
        type: Boolean,
        default: true
      }
    },
    name: "bMap",
    methods: {
      initBMap () {
        let _that = this
        let bmap = new BMap.Map(document.getElementById('bmapContainer'))
        bmap.centerAndZoom(new BMap.Point(116.413, 39.921), 4)

        _that.bmap = bmap

        bmap.enableScrollWheelZoom(true)

        if (_that.needCurrent) {
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
          }, {enableHighAccuracy: true, maximumAge: 0})
        }
      },
      handleSearchLoc () {
        let _that = this
        let point = _that.point

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

        _that.$emit('markerClick', content)
      },
      handleRetItemClick (event) {
        let _that = this

        _that.bmap.centerAndZoom(event.point, 50)
      },
      setBmapMarker (event) {
        let _that = this
        let mkIcon = new BMap.Icon('https://able.gosafenet.com/images/blue_wz.png', new BMap.Size(32, 32))

        let marker = new BMap.Marker(event.point, {
          icon: mkIcon
        })

        _that.$nextTick(() => {
          _that.bmap.addOverlay(marker)

          let label = new BMap.Label(event.title, {offset: new BMap.Size(28, -3)})

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

          _that.bmap.panTo(event.point)
          _that.bmap.centerAndZoom(event.point, 19)
        })
      }
    },
    watch: {
      'locQueryKey' (newVal, oldVal) {
        this.handleSearchLoc()
      }
    },
    data () {
      return {
        locSearchRet: [],
        locQueryKey: ''
      }
    },
    created () {
      this.$nextTick(() => {
        this.debouncedQueryMarkers = _.debounce(this.handleSearchLoc, 1000)

        this.initBMap()
      })
    }
  }
</script>

<style type="text/css" scoped>
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
