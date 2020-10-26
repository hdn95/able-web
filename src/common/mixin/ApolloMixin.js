import {mapActions, mapGetters} from 'vuex'

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: Apollo的混入
 */
export const ApolloMixin = {
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('DefaultTips.last10Minutes'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()

              start.setTime(start.getTime() - 10 * 60 * 1000)

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('DefaultTips.last30Minutes'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()

              start.setTime(start.getTime() - 30 * 60 * 1000)

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('DefaultTips.lastHour'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()

              start.setTime(start.getTime() - 1 * 60 * 60 * 1000)

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('DefaultTips.lastDay'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('DefaultTips.today'),
            onClick (picker) {
              const newData = new Date().toLocaleDateString()

              const end = new Date(new Date(newData).getTime() + 24 * 60 * 60 * 1000 - 1)
              const start = new Date(new Date(newData).getTime())

              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  }
}

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 设备类型树的混入
 */
export const DevicesTreeMixin = {
  computed: {
    ...mapGetters({
      leftDevicesTree: 'LeftDevicesTree'
    })
  },
  methods: {
    ...mapActions({
      handleSetleftDevicesTree: "SetleftDevicesTreeAction"
    }),
    handleNodeClick (event) {
      let _that = this

      switch (event.sort) {
        case "SensorDevice": {
          _that.currentDevice = event
          _that.deviceUid = event.code
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
    handleLoadDevicesTree () {
      let _that = this
      _that.treeLoading = true

      _that.$fetch(`/Device/DevicesTree`, {})
        .then((ret) => {
          _that.handleSetleftDevicesTree(ret.data)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let _that = vm
      let uid = _that.$route.query.deviceUid

      if (uid && uid !== _that.deviceUid) {
        _that.deviceUid = uid

        _that.handleLoadAndQuery()
      }
    })
  },
  data () {
    return {
      currentDevice: null,
      deviceUid: "",
      timeRange: "",
      treeLoading: false,
      treeProps: {children: 'childNodes', label: 'uName'}
    }
  }
}
