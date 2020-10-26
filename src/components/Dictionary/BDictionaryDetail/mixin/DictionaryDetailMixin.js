import {mapActions, mapGetters} from 'vuex'
import {GetDictionaryJsonTree} from "@/utils/UtilsHelper"

export const DictionaryDetailMixin = {
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
    ...mapGetters(['DictionaryJsonTree'])
  },
  methods: {
    handleCloseDialog: function () {
      this.$emit('closeDialog')
    },
    handleOpenDialog: function (loadParent) {
      if (this.DictionaryJsonTree.length <= 0) {
        this.handleLoadAllDictionary(loadParent)
      }

      if (loadParent) this.getParentText(this.DictionaryJsonTree)
    },
    getParentText: function (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.itemId) {
          this.formParentText = item.itemName

          break
        } else {
          this.formParentText = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllDictionary: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`/Dictionary/Dictionaries`, {})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetDictionaryJsonTree(retData, '0')

          _that.handleSetDictionaryJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleNodeClick: function (data) {
      this.formObject.itemId = data.id
      this.formParentText = data.itemName
    },
    ...mapActions({
      handleSetDictionaryJsonTree: 'SetDictionaryJsonTreeAction'
    })
  },
  data () {
    return {
      formRules: {
        itemId: [
          {required: true, message: this.$t('DictionaryDetail.placeholder.parentId'), trigger: 'blur'}
        ],
        itemDetailName: [
          {required: true, message: this.$t('DictionaryDetail.placeholder.projectName'), trigger: 'blur'}
        ],
        itemDetailValue: [
          {required: true, message: this.$t('DictionaryDetail.placeholder.projectValue'), trigger: 'blur'}
        ]
      },
      formParentText: '',
      treeProps: {children: 'childNodes', label: 'itemName'},
      treeLoading: false
    }
  }
}
