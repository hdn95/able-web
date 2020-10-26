import {mapActions, mapGetters} from 'vuex'
import {GetAreaJsonTree} from "@/utils/UtilsHelper"

export const AreaMixin = {
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
    ...mapGetters(['AreasJsonTree'])
  },
  methods: {
    handleCloseDialog: function () {
      this.$emit('closeDialog')
    },
    handleOpenDialog: function (loadParent) {
      if (this.AreasJsonTree.length <= 0) {
        this.handleLoadAllDictionary(loadParent)
      }

      if (loadParent) this.getParentText(this.DictionaryJsonTree)
    },
    getParentText: function (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.parentId) {
          this.formParentText = item.areaName
          break

        } else {
          this.formParentText = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllArea: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`${_that.$route.path}`, {})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetAreaJsonTree(retData, '0')

          _that.handleSetAreasJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleNodeClick: function (data) {
      this.formObject.parentId = data.id
      this.formParentText = data.areaName
    },
    ...mapActions({
      handleSetAreasJsonTree: 'SetAreasJsonTreeAction'
    })
  },
  data () {
    return {
      formRules: {
        areaNumber: [
          {required: true, message: this.$t('AreaManage.placeholder.areaNumber'), trigger: 'blur'}
        ],
        areaName: [
          {required: true, message: this.$t('AreaManage.placeholder.areaName'), trigger: 'blur'}
        ]
      },
      formParentText: '',
      treeProps: {children: 'childNodes', label: 'areaName'},
      treeLoading: false
    }
  }
}
