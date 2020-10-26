export const RoleMixin = {
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
        category: [
          {required: true, message: this.$t('Role.placeholder.category'), trigger: 'change'}
        ],
        fullName: [
          {required: true, message: this.$t('Role.placeholder.name'), trigger: 'blur'}
        ],
        enCode: [
          {required: true, message: this.$t('Role.placeholder.code'), trigger: 'blur'}
        ]
      },
      roleCategory: [
        {text: this.$t('Role.category.role'), key: 1},
        {text: this.$t('Role.category.post'), key: 2},
        {text: this.$t('Role.category.office'), key: 3},
        {text: this.$t('Role.category.workGroup'), key: 4}
      ]
    }
  },
  methods: {
    handleCloseDialog: function () {
      this.$emit('closeDialog')
    },
    handleOpenDialog: function () {

    }
  }
}
