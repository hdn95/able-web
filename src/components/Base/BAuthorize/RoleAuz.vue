<!--授权角色页面-->

<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog">
      <section slot="title">{{$t('Authorization.roleAuzTitle')}}</section>

      <section class="dialog-boday" v-if="formObject">
        <section class="form-module-wrapper-container">
          <section class="title-module-wrapper-container">
            <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
          </section>

          <section class="content-wrapper-container">
            <el-card style="width: 20rem">
              <section style="padding-bottom: 1rem">
                <span class="title">{{$t('User.table.enCode')}}：</span>{{formObject.enCode}}
              </section>

              <section>
                <span class="title">{{$t('User.table.account')}}：</span>{{formObject.account}}
              </section>
            </el-card>
          </section>
        </section>

        <section class="title-module-wrapper-container" style="margin-top: 1rem">
          <section class="left-title-module">{{$t('DefaultTips.datasheets')}}</section>
        </section>

        <section class="content-box-container">
          <section class="conditional-query-container">
            <el-row class="query-wrapper-row">
              <el-col :span="10" class="query-wrapper-row-right">
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

          <b-roles ref="multipleTable" :dataCollection="Roles" @selectionChange="handleSelectionChange"></b-roles>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSubmitRoleAuz">{{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import BRoles from '@components/basis/BList/RolesList'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "RoleAuz",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BRoles
    },
    computed: {
      ...mapGetters(['Roles'])
    },
    props: {
      requestUri: {
        type: String,
        required: true
      },
      formObject: {
        type: Object
      },
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        queryPages: {
          PageIndex: 0,
          PageSize: 0
        },
        userRoles: [],
        querySearchKey: '',
        queryType: 'RoleName',
        queryParams: {
          RoleName: '',
          RoleId: ''
        }
      }
    },
    methods: {
      ...mapActions({
        handleSetRoles: 'SetRolesAction'
      }),
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch('/Base/Roles', Object.assign({}, _that.queryParams, _that.queryPages))
          .then((ret) => {
            const retData = ret.data
            _that.handleSetRoles(retData.items)

            if (_that.userRoles.length <= 0) {
              _that.handleLoadUserRoles()
            } else {
              _that.handleSetRowSelection()
            }
          })
      },

      handleSetRowSelection () {
        let _that = this

        _that.Roles.forEach((item) => {
          _that.userRoles.find((retItem) => {
            if (item.id === retItem.Role.Id) {
              _that.$nextTick(() => {
                _that.$refs.multipleTable.setRowSelection(item)
              })
            }
          })
        })
      },
      handleLoadUserRoles () {
        let _that = this

        _that.$fetch('/Base/RoleByUser', {
          UserId: _that.formObject.id
        })
          .then((ret) => {
            _that.userRoles = ret.data.Items

            _that.$nextTick(() => {
              _that.handleSetRowSelection()
            })
          })
      },

      handleSubmitRoleAuz () {
        let _that = this
        let checkedIds = []

        _that.multipleSelection.forEach((item) => {
          checkedIds.push(item.id)
        })

        _that.$post(_that.requestUri, {
          userId: _that.formObject.id,
          roleIds: checkedIds
        })
          .then(() => {
            _that.$message({message: _that.$t('DefaultTips.saveSuccessText'), type: 'success'})

            _that.handleCloseDialog()
          })
      },

      handleCloseDialog () {
        this.$emit('closeDialog')

        this.$nextTick(() => {
          this.$refs.multipleTable.clearSelection()
          this.userRoles = []
          this.querySearchKey = ""
        })
      },
      handleOpenDialog () {
        this.handleLoadAndQuery()
        this.handleLoadUserRoles()
      }
    }
  }
</script>

<style type="text/css" scoped>
  .form-module-wrapper-container {
    padding-left: 0rem;
  }

  .content-box-container {
    height: auto;
  }

  .dialog-boday .form-container {
    padding-left: 0px;
    margin-bottom: 10px;
  }
</style>
