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
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllThreshold"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="Thresholds" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container">
              <el-form ref="formThresholdDetail" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.parentId')" prop="threshold_id">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('ThresholdDetail.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.level_No')" prop="level_No">
                      <el-input v-model="formObject.level_No" type="text"
                                :placeholder="$t('ThresholdDetail.placeholder.level_No')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.level_Min')">
                      <el-input-number v-model="formObject.level_Min" :step="0.5"></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.enable')">
                      <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                        {{$t('ThresholdDetail.placeholder.enable')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.level_Max')">
                      <el-input-number v-model="formObject.level_Max" :step="0.5"></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.level_Desc')">
                      <el-input type="text" v-model="formObject.level_Desc"
                                :placeholder="$t('ThresholdDetail.placeholder.level_Desc')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('ThresholdDetail.table.remark')">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                v-model="formObject.remark"
                                :placeholder="$t('ThresholdDetail.placeholder.remark')"></el-input>
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
        <el-button size="small" type="primary" @click="handleSave('formThresholdDetail')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {ThresholdDetailMixin} from "@/components/Threshold/BThresholdDetail/mixin/ThresholdDetailMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "New",
    mixins: [ThresholdDetailMixin],
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
    height: 25rem;
  }
</style>
