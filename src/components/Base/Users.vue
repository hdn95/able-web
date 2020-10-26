<!--用户管理页面-->

<template>
  <section class="users-manage-main-container">
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>

            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('User.search.loginAccount')" value="Account"></el-option>
                  <el-option :label="$t('User.search.realName')" value="RealName"></el-option>
                  <el-option :label="$t('User.search.userId')" value="UserId"></el-option>
                </el-select>
              </el-input>
            </section>
          </section>
        </el-col>

        <el-col :span="10">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">
            {{$t('DefaultButton.searchButtonText')}}
          </el-button>
        </el-col>
      </el-row>
    </section>

    <section class="content-box-container">
      <fun-button-group :funs="$route.meta.funs"
                        @refreshEmit="handleLoadAndQuery"
                        @editEmit="handleEdit"
                        @addEmit="handleAdd"
                        @deletedEmit="handleDeleted"
                        @detailEmit="handleDetail">

        <template slot="leftOperate">
          <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                     v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'authorizationResources')"
                     :type="funItem.cssName" plain :icon="funItem.img" @click="handleResourceAuz(funItem.value)">
            {{$t('DefaultButton.resourceAuz')}}
          </el-button>

          <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                     v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'authorizationRoles')"
                     :type="funItem.cssName" plain :icon="funItem.img" @click="handleRoleAuz(funItem.value)">
            {{$t('DefaultButton.roleAuz')}}
          </el-button>
        </template>
      </fun-button-group>

      <section class="table-container">
        <el-table border :data="dataCollection" max-height="420"
                  header-row-class-name="table-header-row-class"
                  class="cus-table"
                  tooltip-effect="light" size="medium"
                  @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column :label="$t('User.table.enCode')" prop="enCode" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('User.table.account')" prop="account" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('User.table.gender')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.gender ===0?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('User.table.realName')" prop="realName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('User.table.mobile')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.mobile |stringReplace}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('User.table.description')" prop="description" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-resource-auz :isVisible="resourceAuzDialog.isVisible" :requestUri="resourceAuzDialog.requestUri"
                    :formObject="resourceAuzDialog.formObject"
                    @closeDialog="resourceAuzDialog.isVisible = false" from="user"></b-resource-auz>

    <b-role-auz :isVisible="roleAuzDialog.isVisible" :requestUri="roleAuzDialog.requestUri"
                :formObject="roleAuzDialog.formObject"
                @closeDialog="roleAuzDialog.isVisible =false"></b-role-auz>

    <b-user-new :isVisible="newDialog.isVisible" :requestUri="newDialog.requestUri"
                @saveRefresh="handleRefresh"
                @closeDialog="newDialog.isVisible = false"></b-user-new>

    <b-user-edit :isVisible="editDialog.isVisible" :requestUri="editDialog.requestUri"
                 :formObject="editDialog.editForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="editDialog.isVisible = false"></b-user-edit>

    <b-user-details :isVisible="detailsDialog.isVisible" :requestUri="detailsDialog.requestUri"
                 :formObject="detailsDialog.detailsForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="detailsDialog.isVisible = false"></b-user-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import BUserNew from '@components/Base/BUser/New'
  import BUserEdit from '@components/Base/BUser/Edit'
  import BUserDetails from '@components/Base/BUser/Details'
  import BResourceAuz from '@components/Base/BAuthorize/ResourceAuz'
  import BRoleAuz from '@components/Base/BAuthorize/RoleAuz'
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {StringReplace} from "@utils/UtilsHelper"
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"

  export default {
    name: "Users",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BRoleAuz,
      BResourceAuz,
      BPaging,
      FunButtonGroup,
      BUserNew,
      BUserEdit,
      BUserDetails
    },
    filters: {
      stringReplace: function (val) {
        return StringReplace(val, 3, 4)
      }
    },
    data () {
      return {
        roleAuzDialog: {
          isVisible: false,
          requestUri: '',
          formObject: null
        },
        resourceAuzDialog: {
          isVisible: false,
          requestUri: '',
          formObject: null
        },
        querySearchKey: '',
        queryType: 'Account',
        queryParams: {
          Account: '',
          RealName: '',
          UserId: ''
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    methods: {
      handleResourceAuz: function (uri) {
        let _that = this

        if (!_that.handleCheckSelection()) return false

        _that.resourceAuzDialog = {
          isVisible: true,
          requestUri: uri,
          formObject: Object.assign({}, _that.multipleSelection[0])
        }
      },
      handleRoleAuz: function (uri) {
        let _that = this

        if (!_that.handleCheckSelection()) return false

        _that.roleAuzDialog = {
          isVisible: true,
          requestUri: uri,
          formObject: Object.assign({}, _that.multipleSelection[0])
        }
      },

      handleLoadAndQuery: function () {
        let _that = this

        _that.formatParams()

        const query = Object.assign({}, _that.queryParams, _that.queryPages)

        _that.$fetch(`${_that.$route.path}`, query)
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
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
