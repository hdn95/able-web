import {mapActions, mapGetters} from 'vuex'
import SelfTree from '@components/basis/BTree/SelfTree'
import {GetDeviceTypeJsonTree} from "@/utils/UtilsHelper"

export const DeviceMixin = {
  components: {
    SelfTree
  },
  computed: {
    ...mapGetters({
      deviceTypeJsonTree: 'DeviceTypeJsonTree'
    })
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    requestUri: {
      type: String,
      required: true
    }
  },
  methods: {
    getParentText (list) {
      let _that = this

      for (const key in list) {
        let item = list[key]

        if (item.id === _that.formObject.deviceTypeId) {
          _that.formParentText = item.typeName
          break

        } else {
          _that.formParentText = ""
        }

        _that.getParentText(item.childNodes)
      }
    },
    handleLoadAllDeviceType (loadParent) {
      let _that = this
      _that.treeLoading = true

      _that.$fetch(`/DeviceType/DeviceTypes`, {})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetDeviceTypeJsonTree(retData, '0')

          _that.handleSetDeviceTypeJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleNodeClick (data) {
      this.formObject.deviceTypeId = data.id
      this.formObject.deviceTypeName = data.typeName

      this.formParentText = data.typeName

      this.$refs['deviceTypeId'].clearValidate()
    },
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    ...mapActions({
      handleSetDeviceTypeJsonTree: 'SetDeviceTypeJsonTreeAction'
    })
  },
  data () {
    let _that = this

    return {
      activeName: 'basicdata',
      retLoc: "",
      treeProps: {children: 'childNodes', label: 'typeName'},
      formParentText: '',
      treeLoading: false,
      pickerOptions: {
        disabledDate (time) {
          if (_that.formObject.productionDate === null || _that.formObject.productionDate === undefined) {
            return true
          }
          return time.getTime() < _that.formObject.productionDate
        }
      },
      formRules: {
        deviceTypeId: [
          {required: true, message: this.$t('Device.placeholder.type'), trigger: 'blur'}
        ],
        device_Alias: [
          {required: true, message: this.$t('Device.placeholder.name'), trigger: 'blur'}
        ],
        uid: [
          {required: true, message: this.$t('Device.placeholder.uid'), trigger: 'blur'}
        ]
      }
    }
  }
}
