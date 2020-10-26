<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog" width="40%">
      <section slot="title">{{$t('DefaultTips.editDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="form-module-wrapper-container pl0">
          <section class="content-wrapper-container" v-if="formObject">
            <el-form ref="formRole" :model="formObject" :rules="formRules" label-position="top">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.category')" prop="category">
                    <el-select v-model="formObject.category" style="width: 100%">
                      <el-option v-for="item in roleCategory"
                                 :key="item.key"
                                 :label="item.text"
                                 :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.code')" prop="enCode">
                    <el-input v-model="formObject.enCode" type="text"
                              :placeholder="$t('Role.placeholder.code')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.name')" prop="fullName">
                    <el-input v-model="formObject.fullName" type="text"
                              :placeholder="$t('Role.placeholder.name')"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.isPublic')">
                    <el-checkbox v-model="formObject.isPublic" :true-label="1" :false-label="0">
                      {{$t('Role.placeholder.isPublic')}}
                    </el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('Role.table.expired')">
                    <el-date-picker type="date" :placeholder="$t('Role.placeholder.expired')"
                                    v-model="formObject.overdueTime"
                                    :editable="false"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </section>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSave('formRole')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
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
