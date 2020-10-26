<!--角色管理详情-->
<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog" width="40%">
      <section slot="title">{{$t('SearchTips.detailedData')}}</section>

      <section class="dialog-boday">
        <section class="form-module-wrapper-container pl0">
          <section class="content-wrapper-container" v-if="formObject">
            <el-form ref="formRole" :model="formObject" :rules="formRules" label-position="top">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.category')">
                    <label v-if="formObject.category==1">角色</label>
                    <label v-if="formObject.category==2">岗位</label>
                    <label v-if="formObject.category==3">职位</label>
                    <label v-if="formObject.category==4">工作组</label>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.code')">
                    <label>{{formObject.enCode}}</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.name')">
                    <label>{{formObject.fullName}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.isPublic')">
                    <el-checkbox v-model="formObject.isPublic" :true-label="1" :false-label="0" disabled>
                      {{$t('Role.placeholder.isPublic')}}
                    </el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.expired')">
                    <label
                      :editable="false"
                      v-if="formObject.birthday"
                      style="width: 100%;"
                    >{{formObject.overdueTime.slice(0,10)}}</label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </section>
        </section>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {RoleMixin} from "@/components/Base/BRole/mixin/RoleMixin"

  export default {
    name: "Edit",
    mixins: [RoleMixin],
    props: {
      formObject: {
        type: Object
      }
    },
    methods: {
      handleSave: function (formName) {
        let _that = this

        _that.$refs[formName].validate((valid) => {
          if (valid) {
            _that.$put(`${_that.requestUri}${_that.formObject.id}`, _that.formObject)
              .then(() => {
                this.$emit('saveRefresh', false)
              })
              .catch(() => {
              })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday {
    height: 20rem;
  }
</style>
