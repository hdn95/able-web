import {mapActions, mapGetters} from 'vuex'
import {GetDeviceTypeJsonTree} from "@/utils/UtilsHelper"

export const DeviceTypeMixin = {
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
  computed: {
    ...mapGetters(['DeviceTypeJsonTree'])
  },
  methods: {
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    handleOpenDialog (loadParent) {
      if (this.DeviceTypeJsonTree.length <= 0) {
        this.handleLoadAllDeviceType(loadParent)
      }

      if (loadParent) this.getParentText(this.DeviceTypeJsonTree)
    },
    getParentText (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.parentId) {
          this.formParentText = item.typeName
          break

        } else {
          this.formParentText = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllDeviceType (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`${_that.$route.path}`, {})
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
      this.formObject.parentId = data.id
      this.formParentText = data.typeName
    },
    ...mapActions({
      handleSetDeviceTypeJsonTree: 'SetDeviceTypeJsonTreeAction'
    })
  },
  data () {
    return {
      formRules: {
        typeCode: [
          {required: true, message: this.$t('DeviceType.placeholder.typeCode'), trigger: 'blur'}
        ],
        typeName: [
          {required: true, message: this.$t('DeviceType.placeholder.typeName'), trigger: 'blur'}
        ],
        typeName_en: [
          {required: true, message: this.$t('DeviceType.placeholder.typeName_en'), trigger: 'blur'}
        ]
      },
      formParentText: '',
      treeProps: {children: 'childNodes', label: 'typeName'},
      treeLoading: false
    }
  }
}
