import {mapActions, mapGetters} from 'vuex'

export const ThresholdDetailMixin = {
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
    ...mapGetters(['Thresholds'])
  },
  methods: {
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    handleOpenDialog (loadParent) {
      if (this.Thresholds.length <= 0) {
        this.handleLoadAllThreshold(loadParent)
      }

      if (loadParent) this.getParentText(this.Thresholds)
    },
    getParentText (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.threshold_id) {
          this.formParentText = item.projectName

          break
        } else {
          this.formParentText = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllThreshold (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`/Threshold/Thresholds`, {})
        .then((ret) => {
          let retData = ret.data.items

          _that.handleSetThresholds(retData)

          if (loadParent) _that.getParentText(retData)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleNodeClick (data) {
      this.formObject.threshold_id = data.id
      this.formParentText = data.projectName
    },
    ...mapActions({
      handleSetThresholds: 'SetThresholdsAction'
    })
  },
  data () {
    return {
      formRules: {
        threshold_id: [
          {required: true, message: this.$t('ThresholdDetail.placeholder.parentId'), trigger: 'blur'}
        ],
        level_No: [
          {required: true, message: this.$t('ThresholdDetail.placeholder.level_No'), trigger: 'blur'}
        ]
      },
      formParentText: '',
      treeProps: {children: 'childNodes', label: 'projectName'},
      treeLoading: false
    }
  }
}
