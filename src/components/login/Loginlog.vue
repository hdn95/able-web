<!--登陆日志页面-->

<template>
  <section>
    <section class="content-box-container">
      <fun-button-group :funs="[]" @refreshEmit="handleLoadAndQuery"></fun-button-group>

      <section class="table-container">
        <el-table border :data="dataCollection" max-height="520"
                  header-row-class-name="table-header-row-class"
                  class="cus-table"
                  tooltip-effect="light" size="medium" ref="multipleTable">
          <el-table-column :label="$t('LoginLog.table.ipAddress')" prop="remoteIPAddress" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('LoginLog.table.operatingTime')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.operateDateTime | formatDate}}</span>
            </template>
          </el-table-column>
        </el-table>
        <section class="auxiliary-text">{{$t("LoginLog.tips.tips")}}</section>
      </section>
    </section>
  </section>
</template>

<script>
  import {formatDate} from "@/utils/UtilsHelper"
  import {GetLoginUser} from "@common/js/login/LoginManage"
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"

  export default {
    name: "Loginlog",
    mixins: [QueryParamsMixin, MethodsMixin],
    filters: {
      formatDate: function (event) {
        return formatDate(event, "yyyy-MM-dd hh:mm:ss")
      }
    },
    computed: {
      LoginUser () {
        return GetLoginUser()
      }
    },
    components: {
      FunButtonGroup
    },
    methods: {
      handleLoadAndQuery () {
        let _that = this

        _that.$fetch(`/Base/Logs`,
          Object.assign({}, {
            OperateType: "Login",
            UserId: _that.LoginUser.id,
            PageIndex: 1,
            PageSize: 10
          }))
          .then((ret) => {
            const retData = ret.data

            _that.dataCollection = retData.items
          })
          .catch(() => {
          })
      }
    },
    created () {
      this.$nextTick(() => {
        this.handleLoadAndQuery()
      })
    }
  }
</script>

<style type="text/css" scoped>

</style>
