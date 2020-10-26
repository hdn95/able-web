import {mapActions, mapGetters} from 'vuex'

export const ThresholdMixin = {
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
    ...mapGetters(['ThresholdDictionary'])
  },
  methods: {
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    handleOpenDialog () {
      if (this.ThresholdDictionary.length <= 0) {
        this.handleLoadAllThresholdDictionary()
      }
    },
    handleLoadAllThresholdDictionary () {
      let _that = this
      let itemId = "784d8883-96d6-4dfe-823c-7ab5f68c8266"

      _that.$fetch(`/Dictionary/DictionaryDetail`, {
        ItemId: itemId
      })
        .then((ret) => {
          let retData = ret.data.items

          _that.handleSetThresholdDictionary(retData)
        })
        .catch(() => {
        })
    },
    ...mapActions({
      handleSetThresholdDictionary: 'SetThresholdDictionaryAction'
    })
  },
  data () {
    return {
      formRules: {
        categoryName: [
          {required: true, message: this.$t('Thresholds.placeholder.category'), trigger: 'change'}
        ],
        projectCode: [
          {required: true, message: this.$t('Thresholds.placeholder.enCode'), trigger: 'blur'}
        ],
        projectName: [
          {required: true, message: this.$t('Thresholds.placeholder.name'), trigger: 'blur'}
        ]
      }
    }
  }
}
