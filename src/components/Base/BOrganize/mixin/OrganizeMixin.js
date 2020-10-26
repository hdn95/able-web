import {mapActions, mapGetters} from 'vuex'
import {GetOrganizesJsonTree} from "@utils/UtilsHelper"

export const OrganizeMixin = {
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
  data () {
    return {
      organizeCategory: [
        {key: 0, text: this.$t('Organize.category.group')},
        {key: 1, text: this.$t('Organize.category.company')},
        {key: 2, text: this.$t('Organize.category.branch')},
        {key: 3, text: this.$t('Organize.category.subsidiary')}
      ],
      formRules: {
        fullName: [
          {required: true, message: this.$t('Organize.placeholder.fullName'), trigger: 'blur'}
        ],
        category: [
          {required: true, message: this.$t('Organize.placeholder.category'), trigger: 'change'}
        ]
      },
      formParentText: '',
      treeProps: {
        children: 'childNodes',
        label: 'fullName'
      },
      treeLoading: false
    }
  },
  computed: {
    ...mapGetters(['OrganizesJsonTree'])
  },
  methods: {
    handleCloseDialog: function () {
      this.$emit('closeDialog')
    },
    handleOpenDialog: function (loadParent) {
      if (this.OrganizesJsonTree.length <= 0) {
        this.handleLoadAllOrganizes(loadParent)
      }

      if (loadParent) this.getParentText(this.OrganizesJsonTree)
    },
    getParentText: function (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.parentId) {
          this.formParentText = item.fullName

          break
        } else {
          this.formParentText = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllOrganizes: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`${_that.$route.path}`, {})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetOrganizesJsonTree(retData, '0')

          _that.handleSetOrganizesJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleNodeClick: function (data) {
      this.formObject.parentId = data.id
      this.formParentText = data.fullName
    },
    ...mapActions({
      handleSetOrganizesJsonTree: 'SetOrganizesJsonTreeAction'
    })
  }
}
