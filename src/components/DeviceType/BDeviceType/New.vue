<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog">
      <section slot="title">{{$t('DefaultTips.addDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="tree-module-wrapper-container" v-loading="treeLoading">

            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

              <section class="right-title-module">
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllDeviceType"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="DeviceTypeJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container">
              <el-form ref="formDeviceType" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('DeviceType.table.parentId')">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('DeviceType.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('DeviceType.table.typeCode')" prop="typeCode">
                      <el-input v-model="formObject.typeCode" type="text"
                                :placeholder="$t('DeviceType.placeholder.typeCode')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('DeviceType.table.typeName')" prop="typeName">
                      <el-input v-model="formObject.typeName" type="text"
                                :placeholder="$t('DeviceType.placeholder.typeName')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('DeviceType.table.typeName_en')" prop="typeName_en">
                      <el-input v-model="formObject.typeName_en" type="text"
                                :placeholder="$t('DeviceType.placeholder.typeName_en')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('DeviceType.table.enable')">
                      <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                        {{$t('DeviceType.placeholder.enable')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item :label="$t('DeviceType.table.remark')">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                v-model="formObject.remark"
                                :placeholder="$t('DeviceType.placeholder.remark')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </section>
          </section>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSave('formDeviceType')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import SelfTree from '@components/basis/BTree/SelfTree'
  import {DeviceTypeMixin} from "@/components/DeviceType/BDeviceType/mixin/DeviceTypeMixin"

  export default {
    name: "New",
    mixins: [DeviceTypeMixin],
    components: {
      SelfTree
    },
    methods: {
      handleSave (formName) {
        let _that = this

        _that.$refs[formName].validate((valid) => {
          if (valid) {
            _that.$post(_that.requestUri, _that.formObject)
              .then(() => {
                this.$emit('saveRefresh', true)

                _that.$nextTick(() => {
                  _that.$refs[formName].resetFields()
                })
              })
              .catch(() => {
              })
          } else {
            return false
          }
        })
      }
    },
    data () {
      return {
        formObject: {}
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday {
    height: 20rem;
  }

  .tree-module-wrapper-container {
    height: 20rem;
  }
</style>
