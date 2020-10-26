<!--授权资源页面-->

<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog" width="40%">
      <div slot="title" v-if="from===fromType">{{$t('Authorization.auzResourceforRoleTitle')}}</div>
      <div slot="title" v-else>{{$t('Authorization.auzResourceforUserTitle')}}</div>

      <section class="dialog-boday" v-if="formObject">
        <section class="tree-module-wrapper-container" v-loading="treeLoading">

          <section class="title-module-wrapper-container">
            <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

            <section class="right-title-module">
              <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllResources"></i>
            </section>
          </section>

          <self-tree :jsonData="AllResourcesJsonTree" :showCheckbox="true" ref="selfTree"
                     style="margin-top: .35rem"></self-tree>
        </section>

        <section class="form-module-wrapper-container">
          <section class="title-module-wrapper-container">
            <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
          </section>

          <section class="content-wrapper-container" v-if="from===fromType">
            <el-card style="width: 20rem">
              <section style="padding-bottom: 1rem">
                <span class="title">{{$t('Role.table.code')}}：</span>{{formObject.enCode}}
              </section>

              <section>
                <span class="title">{{$t('Role.table.name')}}：</span>{{formObject.fullName}}
              </section>
            </el-card>
          </section>

          <section class="content-wrapper-container" v-else>
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
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSubmitRoleAuz" v-if="from===fromType">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
        <el-button size="small" type="primary" @click="handleSubmitUserAuz" v-else>
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex'
  import {GetResourcesJsonTree} from "@/utils/UtilsHelper"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "ResourceAuz",
    props: {
      requestUri: {
        type: String,
        required: true
      },
      from: {
        type: String,
        default: 'role'
      },
      formObject: {
        type: Object
      },
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SelfTree
    },
    computed: {
      ...mapGetters(['AllResourcesJsonTree'])
    },
    data () {
      return {
        fromType: "role",
        treeLoading: false
      }
    },
    methods: {
      handleLoadRoleResources: function () {
        let _that = this

        _that.$fetch('/Base/ResourceByRole', {
          RoleId: _that.formObject.id
        })
          .then((ret) => {
            _that.handleSetTreeDefault(ret.data.Items)
          })
      },
      handleSubmitRoleAuz: function () {
        let _that = this
        const checkedKeys = _that.$refs.selfTree.getCheckedKeys()

        _that.$post(_that.requestUri, {
          roleId: _that.formObject.id,
          resourceIds: checkedKeys
        })
          .then(() => {
            _that.$message({message: _that.$t('DefaultTips.saveSuccessText'), type: 'success'})

            _that.handleCloseDialog()
          })
      },

      handleLoadUserResources () {
        let _that = this

        _that.$fetch('/Base/ResourceByUser', {
          UserId: _that.formObject.id
        })
          .then((ret) => {
            _that.handleSetTreeDefault(ret.data.Items)
          })
      },
      handleSetTreeDefault (list) {
        let _that = this
        let ids = []

        if (list.length <= 0) {
          _that.AllResourcesJsonTree.forEach((item) => {
            if (item.resourceType === 999) {
              ids.push(item.id)
            }
          })
        } else {
          list.forEach((item) => {
            ids.push(item.Resource.Id)
          })
        }

        _that.$nextTick(() => {
          this.$refs.selfTree.setCheckedKeys(ids)
          this.$refs.selfTree.setDefaultExpand(ids)
        })
      },
      handleSubmitUserAuz () {
        let _that = this
        const checkedKeys = _that.$refs.selfTree.getCheckedKeys()

        _that.$post(_that.requestUri, {
          userId: _that.formObject.id,
          resourceIds: checkedKeys
        })
          .then(() => {
            _that.$message({message: _that.$t('DefaultTips.saveSuccessText'), type: 'success'})

            _that.handleCloseDialog()
          })
      },

      handleLoadAllResources () {
        let _that = this
        _that.treeLoading = true

        _that.$fetch('/Base/Resources', {})
          .then((ret) => {
            let retData = ret.data.items
            // let jsonTree = GetResourcesJsonTree(retData, '-1', true)

            _that.handleSetAllResourcesJsonTree(retData)
            _that.treeLoading = false
          })
          .catch(() => {
            _that.treeLoading = false
          })
      },
      handleCloseDialog () {
        this.$emit('closeDialog')

        this.$nextTick(() => {
          this.$refs.selfTree.setCheckedKeys([])
          this.$refs.selfTree.setDefaultExpand([])
          this.$refs.selfTree.setFold()
        })
      },
      handleOpenDialog () {
        if (this.AllResourcesJsonTree.length <= 0) {
          this.handleLoadAllResources()
        }

        if (this.from === this.fromType) {
          this.handleLoadRoleResources()
        } else {
          this.handleLoadUserResources()
        }
      },
      ...mapActions({
        handleSetAllResourcesJsonTree: 'SetAllResourcesJsonTreeAction'
      })
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday >>> .tree-module-wrapper-container {
    height: 25rem !important;
    overflow-y: auto;
    width: 40%;
  }

  .dialog-boday {
    height: 25rem !important;
    overflow-y: hidden;
    display: flex;
    display: -webkit-flex;
  }
</style>
