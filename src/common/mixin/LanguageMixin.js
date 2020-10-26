import {mapActions} from 'vuex'

/**
 *@date: 2018-09-26 11:39:26
 *@author: jing.fu@gosafenet.com
 *@desc: 语言切换
 */
export const LanguageMixin = {
  methods: {
    ...mapActions({
      handleSetCurrentLanguageAction: 'SetCurrentLanguageAction',
      handleSetleftDevicesTree: "SetleftDevicesTreeAction"
    }),
    handleLoadDevicesTree () {
      let _that = this
      _that.$fetch(`/Device/DevicesTree`, {})
        .then((ret) => {
          _that.handleSetleftDevicesTree(ret.data)
        })
        .catch(() => {
        })
    },
    handleSwitchlanguage (event, loadMenu) {
      let _that = this

      _that.$confirm(_that.$t('Language.confirm.text'), _that.$t('MessageBox.confirmTitle'), {
        confirmButtonText: _that.$t('DefaultButton.confirmButtonText'),
        cancelButtonText: _that.$t('DefaultButton.cancelButtonText'),
        iconClass: 'el-icon-question'
      })
        .then(() => {
          _that.handleSetCurrentLanguageAction(event)
          _that.$i18n.locale = event.key

          loadMenu ? _that.handleGetMenu(true) : window.location.reload()
        })
        .catch(() => {
        })
    }
  }
}
