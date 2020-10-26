<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)">
      <section slot="title">{{$t('DefaultTips.editDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="tree-module-wrapper-container" v-loading="treeLoading">

            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

              <section class="right-title-module">
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                   @click="handleLoadAllDictionary(true)"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="DictionaryJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formDictionaryDetail" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.parentId')" prop="itemId">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('DictionaryDetail.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.projectName')" prop="itemDetailName">
                      <el-input v-model="formObject.itemDetailName" type="text"
                                :placeholder="$t('DictionaryDetail.placeholder.projectName')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.projectValue')" prop="itemDetailValue">
                      <el-input v-model="formObject.itemDetailValue" type="text"
                                :placeholder="$t('DictionaryDetail.placeholder.projectValue')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.simpleSpelling')">
                      <el-input v-model="formObject.simpleSpelling" type="text"
                                :placeholder="$t('DictionaryDetail.placeholder.simpleSpelling')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.remark')">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                v-model="formObject.remark"
                                :placeholder="$t('DictionaryDetail.placeholder.remark')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('DictionaryDetail.table.enable')">
                      <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                        {{$t('DictionaryDetail.placeholder.enable')}}
                      </el-checkbox>
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
        <el-button size="small" type="primary" @click="handleSave('formDictionaryDetail')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {DictionaryDetailMixin} from "@/components/Dictionary/BDictionaryDetail/mixin/DictionaryDetailMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "Edit",
    mixins: [DictionaryDetailMixin],
    props: {
      formObject: {
        type: Object
      }
    },
    components: {
      SelfTree
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
  .dialog-boday, .tree-module-wrapper-container {
    height: 20rem;
  }
</style>
