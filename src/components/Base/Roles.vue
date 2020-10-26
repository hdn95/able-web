<!--角色管理页面-->

<template>
  <section class="roles-manage-main-container">
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>
            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Role.search.roleName')" value="RoleName"></el-option>
                  <el-option :label="$t('Role.search.roleId')" value="RoleId"></el-option>
                </el-select>
              </el-input>
            </section>
          </section>
        </el-col>
        <el-col :span="5">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">
            {{$t('DefaultButton.searchButtonText')}}
          </el-button>
        </el-col>
      </el-row>
    </section>

    <section class="content-box-container roles-list-container">
      <fun-button-group :funs="$route.meta.funs"
                        @refreshEmit="handleLoadAndQuery"
                        @deletedEmit="handleDeleted"
                        @addEmit="handleAdd"
                        @editEmit="handleEdit"
                        @detailEmit="handleDetail">

        <template slot="leftOperate">
          <el-button v-for="(funItem) in $route.meta.funs" :key="funItem.id"
                     v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'authorizationResources')"
                     :type="funItem.cssName" plain :icon="funItem.img" @click="handleResourceAuz(funItem.value)">
            {{$t('DefaultButton.resourceAuz')}}
          </el-button>
        </template>
      </fun-button-group>

      <b-roles :dataCollection="dataCollection" @selectionChange="handleSelectionChange"
               ref="multipleTable"></b-roles>

      <b-paging :pageIndex="queryPages.PageIndex"
                :pageSize="queryPages.PageSize"
                :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-resource-auz :isVisible="resourceAuzDialog.isVisible"
                    :requestUri="resourceAuzDialog.requestUri"
                    :formObject="resourceAuzDialog.formObject"
                    @closeDialog="resourceAuzDialog.isVisible = false"></b-resource-auz>

    <b-role-new :isVisible="newDialog.isVisible"
                :requestUri="newDialog.requestUri"
                @saveRefresh="handleRefresh"
                @closeDialog="newDialog.isVisible = false"></b-role-new>

    <b-role-edit :isVisible="editDialog.isVisible"
                 :requestUri="editDialog.requestUri"
                 :formObject="editDialog.editForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="editDialog.isVisible = false"></b-role-edit>

    <b-role-details :isVisible="detailsDialog.isVisible" :requestUri="detailsDialog.requestUri"
                 :formObject="detailsDialog.detailsForm"
                 @saveRefresh="handleRefresh"
                 @closeDialog="detailsDialog.isVisible = false"></b-role-details>
  </section>
</template>

<script type="text/ecmascript-6">
  import BRoleNew from '@components/Base/BRole/New'
  import BRoleEdit from '@components/Base/BRole/Edit'
  import BRoleDetails from '@components/Base/BRole/Details'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BRoles from '@components/basis/BList/RolesList'
  import BResourceAuz from '@components/Base/BAuthorize/ResourceAuz'
  import BPaging from '@components/basis/BPaging/index'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"

  export default {
    name: "Roles",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BRoles,
      BResourceAuz,
      FunButtonGroup,
      BPaging,
      BRoleNew,
      BRoleEdit,
      BRoleDetails
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    data () {
      return {
        resourceAuzDialog: {
          isVisible: false,
          requestUri: '',
          formObject: null
        },
        querySearchKey: '',
        queryType: 'RoleName',
        queryParams: {
          RoleName: '',
          RoleId: ''
        }
      }
    },
    methods: {
      handleResourceAuz (event) {
        let _that = this

        if (!_that.handleCheckSelection()) return false

        _that.resourceAuzDialog = {
          isVisible: true,
          requestUri: event,
          formObject: Object.assign({}, _that.multipleSelection[0])
        }
      },
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages))
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
