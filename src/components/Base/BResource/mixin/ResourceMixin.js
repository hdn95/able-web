import {mapActions, mapGetters} from 'vuex'
import {MethodType} from "@common/js/BasisConfig"
import BIcon from '@components/basis/BIcon/index'

export const ResourceMixin = {
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
      formRules: {
        owner: [
          {required: true, message: this.$t('Resource.placeholder.owner'), trigger: 'blur'}
        ],
        description: [
          {required: true, message: this.$t('Resource.placeholder.description'), trigger: 'blur'}
        ],
        resourceUrl: [
          {required: true, message: this.$t('Resource.placeholder.url'), trigger: 'blur'}
        ],
        parentId: [
          {required: true, message: this.$t('Resource.placeholder.parentId'), trigger: 'blur'}
        ]
      },
      treeLoading: false,
      methodType: MethodType,
      resourceType: [
        {text: this.$t('ResourceType.module'), key: 100},
        {text: this.$t('ResourceType.page'), key: 200},
        {text: this.$t('ResourceType.function'), key: 300},
        {text: this.$t('ResourceType.other'), key: 999}
      ],
      iconIsVisible: false,
      formParentText: '',
      treeProps: {
        children: 'childNodes',
        label: 'description'
      }
    }
  },
  computed: {
    ...mapGetters(['UnFunResourcesJsonTree'])
  },
  components: {
    BIcon
  },
  methods: {
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    handleOpenDialog (loadParent) {
      if (this.UnFunResourcesJsonTree.length <= 0) {
        this.handleLoadAllResources(loadParent)
      }

      if (loadParent) this.getParentText(this.UnFunResourcesJsonTree)
    },
    handleIconSelection (event) {
      this.formObject.icon = event.icon
    },
    handleNodeClick (data) {
      this.formObject.parentId = data.id
      this.formParentText = data.description
    },
    getParentText (list) {
      for (const key in list) {
        let item = list[key]

        if (this.formObject.parentId === item.id) {
          this.formParentText = item.description

          break
        }

        this.getParentText(item.childNodes)
      }
    },
    handleLoadAllResources (loadParent) {
      let _that = this
      _that.treeLoading = true

      _that.$fetch('/Base/Resources', {})
        .then((ret) => {
          let retData = ret.data.items

          // let jsonTree = GetResourcesJsonTree(retData, '-1', false)

          _that.handleSetAllResourcesJsonTree(retData)

          if (loadParent) _that.getParentText(_that.UnFunResourcesJsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    ...mapActions({
      handleSetAllResourcesJsonTree: 'SetAllResourcesJsonTreeAction'
    })
  }
}
