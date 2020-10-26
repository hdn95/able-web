import {LoginType} from "@/common/js/BasisConfig"
import {mapActions, mapGetters} from 'vuex'
import {GetDepartmentsJsonTree} from "@utils/UtilsHelper"

export const UserMixin = {
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
    let validatorLoginType = (rule, value, callback) => {
      if (this.checkedLoginType.length <= 0) {
        callback(new Error(this.$t('User.placeholder.loginType')))
      } else {
        callback()
      }
    }
    return {
      checkedLoginType: [],
      loginType: LoginType,
      genderType: [
        {text: this.$t('User.genderType.male'), key: 0},
        {text: this.$t('User.genderType.female'), key: 1},
        {text: this.$t('User.genderType.other'), key: 2}
      ],
      treeProps: {
        children: 'childNodes',
        label: 'fullName'
      },
      treeLoading: false,
      formParentText: '',
      formRules: {
        enCode: [
          {required: true, message: this.$t('User.placeholder.enCode'), trigger: 'blur'}
        ],
        account: [
          {required: true, message: this.$t('User.placeholder.account'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('User.placeholder.password'), trigger: 'blur'}
        ],
        loginType: [
          {type: 'array', required: true, validator: validatorLoginType, trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['DepartmentsJsonTree'])
  },
  methods: {
    handleCloseDialog () {
      this.$emit('closeDialog')
    },
    handleOpenDialog (loadParent) {
      this.formObject.password = ""

      let loginType = this.formObject.loginType

      this.loginType.forEach((item) => {
        let ret = loginType & item.key

        if (ret === item.key) {
          this.checkedLoginType.push(item.key)
        }
      })
      if (this.DepartmentsJsonTree.length <= 0) {
        this.handleLoadAllDepartments(loadParent)
      }

      if (loadParent) this.getParentText(this.DepartmentsJsonTree)
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
    handleLoadAllDepartments: function (loadParent) {
      let _that = this

      _that.treeLoading = true

      _that.$fetch(`/Base/Departments`, {PageIndex:0,PageSize:0})
        .then((ret) => {
          let retData = ret.data.items

          let jsonTree = GetDepartmentsJsonTree(retData, "0")

          _that.handleSetDepartmentsJsonTree(jsonTree)

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
      handleSetDepartmentsJsonTree: 'SetDepartmentsJsonTreeAction'
    })
  }
}
