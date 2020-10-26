import {GetDepartmentsJsonTree,GetOrganizesJsonTree} from "@/utils/UtilsHelper"
import {mapActions, mapGetters} from 'vuex'

export const DepartmentMixin = {
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
      remoteOrganizes: [],
      remoteLoading: false,
      formRules: {
        organizeId: [
          {required: true, message: this.$t('Department.placeholder.owner')}
        ],
        fullName: [
          {required: true, message: this.$t('Department.placeholder.fullName'), trigger: 'blur'}
        ],
        enCode: [
          {required: true, message: this.$t('Department.placeholder.enCode'), trigger: 'blur'}
        ]
      },
      treeLoading: false,
      formParentText: '',
      organizeName: '',
      treeProps: {
        children: 'childNodes',
        label: 'fullName'
      },
      treeProps2: {
        children: 'childNodes',
        label: 'fullName'
      }
    }
  },
  computed: {
    ...mapGetters(['DepartmentsJsonTree','OrganizesJsonTree'])
  },
  methods: {
    handleCloseDialog: function () {
      this.$emit('closeDialog')
    },
    handleOpenDialog: function (loadParent) {
      if (this.DepartmentsJsonTree.length <= 0) {
        this.handleLoadAllDepartments(loadParent)
      }else if (this.OrganizesJsonTree.length <= 0){
        this.handleLoadAllOrganize(loadParent)
      }

      if (loadParent) this.getParentText(this.DepartmentsJsonTree)
                      this.getParentText2(this.OrganizesJsonTree)
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
    getParentText2: function (list) {
      for (const key in list) {
        let item = list[key]

        if (item.id === this.formObject.parentId) {
          this.organizeName = item.fullName

          break
        } else {
          this.organizeName = ""
        }

        this.getParentText(item.childNodes)
      }
    },
    handleRemoteOrganizes: function (query) {
      let _that = this

      if (query !== "") {
        _that.remoteLoading = true

        _that.$fetch('/Base/Organizes', {OrganizeName: query})
          .then((ret) => {
            const retData = ret.data
            _that.remoteLoading = false

            _that.remoteOrganizes = retData.items
          })
          .catch(() => {
            _that.remoteLoading = false
          })
      } else {
        _that.remoteOrganizes = []
      }
    },
    handleNodeClick: function (data) {
      this.formObject.parentId = data.id
      this.formParentText = data.fullName
    },
    handleNodeClick2: function (data) {
      this.organizeName = data.fullName
      this.formObject.organizeId = data.id
      // this.handleLoadAllDepartments()
    },
    handleLoadAllDepartments: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`/Base/Departments`, {PageIndex:0,PageSize:0,OrganizeId:_that.formObject.organizeId})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetDepartmentsJsonTree(retData, '0')

          _that.handleSetDepartmentsJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    handleLoadAllOrganize: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`/Base/Organizes`, {PageIndex:0,PageSize:0})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetOrganizesJsonTree(retData, '0')
          console.log('机构树'+retData)
          _that.handleSetOrganizesJsonTree(jsonTree)

          if (loadParent) _that.getParentText(jsonTree)

          _that.treeLoading = false
        })
        .catch(() => {
          _that.treeLoading = false
        })
    },
    ...mapActions({
      handleSetDepartmentsJsonTree: 'SetDepartmentsJsonTreeAction',
      handleSetOrganizesJsonTree: 'SetOrganizesJsonTreeAction'
    })
  }
}
