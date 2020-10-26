/**
 *@date: 2018-07-27 11:43:41
 *@author: jing.fu@gosafenet.com
 *@desc: 公共分页参数Mixin
 */
export const QueryParamsMixin = {
  data () {
    return {
      totalCount: 0,
      queryPages: {
        PageIndex: 1,
        PageSize: 15
      }
    }
  }
}

/**
 *@date: 2018-07-27 11:43:41
 *@author: jing.fu@gosafenet.com
 *@desc: 所有列表页公共MethodsMixin
 */
export const MethodsMixin = {
  data () {
    return {
      editDialog: {
        editForm: null,
        requestUri: '',
        isVisible: false
      },
      detailsDialog: {
        detailsForm: null,
        requestUri: '',
        isVisible: false
      },
      newDialog: {
        isVisible: false,
        requestUri: ''
      },
      dataCollection: [],
      multipleSelection: []
    }
  },
  methods: {
    /**
     *@date: 2018-09-11 13:38:34
     *@author: jing.fu@gosafenet.com
     *@desc: 新增/修改保存后的刷新操作
     */
    handleRefresh (flag) {
      flag ? this.newDialog = {
          isVisible: false,
          requestUri: ''
        }
        : this.editDialog = {
          editForm: null,
          requestUri: '',
          isVisible: false
        }

      this.handleLoadAndQuery()
    },

    /**
     *@date: 2018-09-11 15:57:08
     *@author: jing.fu@gosafenet.com
     *@desc: 新增弹框
     */
    handleAdd (event) {
      this.newDialog = {
        isVisible: true,
        requestUri: event
      }
    },

    /**
     *@date: 2018-09-11 15:57:23
     *@author: jing.fu@gosafenet.com
     *@desc: 修改弹框
     */
    handleEdit (event) {
      let _that = this

      if (!_that.handleCheckSelection()) return false

      this.editDialog = {
        isVisible: true,
        editForm: Object.assign({}, _that.multipleSelection[0]),
        requestUri: event.substring(0, event.indexOf('{'))
      }
    },

    /**
     *@date: 2019-01-11 15:57:23
     *@author: dan.zhang@gosafenet.com
     *@desc: 详情页弹框
     */
    handleDetail (event) {
      let _that = this

      if (!_that.handleCheckSelection()) return false

      this.detailsDialog = {
        isVisible: true,
        detailsForm: Object.assign({}, _that.multipleSelection[0]),
        requestUri: event
      }
    },

    /**
     *@date: 2018-07-27 11:52:40
     *@author: jing.fu@gosafenet.com
     *@desc: 格式化请求参数
     */
    formatParams () {
      for (const key in this.queryParams) {
        if (key === this.queryType) {

          this.queryParams[key] = this.querySearchKey
        } else {

          this.queryParams[key] = ""
        }
      }
    },

    /**
     *@date: 2018-07-27 11:53:01
     *@author: jing.fu@gosafenet.com
     *@desc: table复选框选中回调事件
     */
    handleSelectionChange: function (val) {
      this.multipleSelection = val
    },

    /**
     *@date: 2018-09-03 09:06:38
     *@author: jing.fu@gosafenet.com
     *@desc: 判断是否有选择table数据
     */
    handleCheckSelection () {
      let _that = this

      if (_that.multipleSelection.length <= 0) {
        _that.$message({message: `${_that.$t('DefaultTips.pendingSelectionTips')}`, type: 'error'})

        return false
      } else if (_that.multipleSelection.length > 1) {
        _that.$message({message: `${_that.$t('DefaultTips.overflowLimitedTips')}`, type: 'error'})

        return false
      }

      return true
    },
    /**
     *@date: 2018-07-27 11:53:43
     *@author: jing.fu@gosafenet.com
     *@desc: table数据选中调起删除
     */
    handleDeleted (event) {
      let _that = this
      let uri = event.substring(0, event.indexOf('{'))

      if (!_that.handleCheckSelection()) return false

      _that.$confirm(_that.$t('DefaultTips.deletedConfirmTips'), _that.$t('MessageBox.confirmTitle'), {
        confirmButtonText: _that.$t('DefaultButton.deleteButtonText'),
        cancelButtonText: _that.$t('DefaultButton.cancelButtonText'),
        iconClass: 'el-icon-question'
      }).then(() => {
        let single = _that.multipleSelection[0]
        let index = _that.dataCollection.indexOf(single)

        _that.$remove(`${uri}${single.id}`, {})
          .then(() => {
            _that.dataCollection.splice(index, 1)
            _that.totalCount -= 1
          })
      }).catch(() => {

      })
    },

    /**
     *@date: 2018-07-27 11:56:02
     *@author: jing.fu@gosafenet.com
     *@desc: 分页当前页改变时调起
     */
    handlePageChange (val) {
      this.queryPages.PageIndex = val

      this.handleLoadAndQuery()
    },

    /**
     *@date: 2018-07-27 11:56:02
     *@author: jing.fu@gosafenet.com
     *@desc: 分页页码改变时调起
     */
    handlePageSizeChange (val) {
      this.queryPages.PageSize = val

      this.handleLoadAndQuery()
    }
  }
}
