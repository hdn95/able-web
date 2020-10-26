<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog">
      <section slot="title">{{$t('DefaultTips.editDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="form-module-wrapper-container  pl0">
          <section class="content-wrapper-container" v-if="formObject">
            <el-form ref="formThreshold" :model="formObject" :rules="formRules" label-position="top">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.category')" prop="categoryName">
                    <section class="form-item-btn-container">
                      <el-select v-model="formObject.categoryName" style="width: 100%">
                        <el-option v-for="item in ThresholdDictionary" :key="item.id"
                                   :label="item.itemDetailValue"
                                   :value="item.itemDetailValue">
                          <span style="float: left">{{ item.itemDetailValue }}</span>
                          <span style="float: right; color: #909399;">{{ item.simpleSpelling }}</span>
                        </el-option>
                      </el-select>

                      <section class="btn">
                        <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                           @click="handleLoadAllThresholdDictionary"></i>
                      </section>
                    </section>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.enCode')" prop="projectCode">
                    <el-input v-model="formObject.projectCode" type="text"
                              :placeholder="$t('Thresholds.placeholder.enCode')"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.name')" prop="projectName">
                    <el-input v-model="formObject.projectName" type="text"
                              :placeholder="$t('Thresholds.placeholder.name')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.suitable_Min')">
                    <el-input-number v-model="formObject.suitable_Min" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.warning_Min')">
                    <el-input-number v-model="formObject.warning_Min" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.standard_Min')">
                    <el-input-number v-model="formObject.standard_Min" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.suitable_Max')">
                    <el-input-number v-model="formObject.suitable_Max" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.warning_Max')">
                    <el-input-number v-model="formObject.warning_Max" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.standard_Min')">
                    <el-input-number v-model="formObject.standard_Max" :step="0.5"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.enable')">
                    <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                      {{$t('Thresholds.placeholder.enable')}}
                    </el-checkbox>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.unit')">
                    <el-input type="text" v-model="formObject.unit"
                              :placeholder="$t('Thresholds.placeholder.unit')"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('Thresholds.table.remark')">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                              v-model="formObject.remark" :placeholder="$t('Thresholds.placeholder.remark')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </section>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSave('formThreshold')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {ThresholdMixin} from "@/components/Threshold/BThreshold/mixin/ThresholdMixin"

  export default {
    name: "Edit",
    mixins: [ThresholdMixin],
    props: {
      formObject: {}
    },
    methods: {
      handleSave (formName) {
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
    height: 23rem;
  }

  .content-wrapper-container {
    margin-top: 0rem;
  }
</style>
