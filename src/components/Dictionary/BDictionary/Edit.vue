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
              <el-form ref="formDictionary" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Dictionary.table.parentId')" prop="parentId">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('Dictionary.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Dictionary.table.name')" prop="itemName">
                      <el-input v-model="formObject.itemName" type="text"
                                :placeholder="$t('Dictionary.placeholder.name')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Dictionary.table.code')" prop="itemCode">
                      <el-input v-model="formObject.itemCode" type="text"
                                :placeholder="$t('Dictionary.placeholder.code')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item :label="$t('Dictionary.table.setting')">
                      <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                        {{$t('Dictionary.placeholder.enable')}}
                      </el-checkbox>
                      <el-checkbox v-model="formObject.isTree" :true-label="1" :false-label="0">
                        {{$t('Dictionary.placeholder.isTree')}}
                      </el-checkbox>
                      <el-checkbox v-model="formObject.isNav" :true-label="1" :false-label="0">
                        {{$t('Dictionary.placeholder.isNav')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Dictionary.table.remark')">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                v-model="formObject.remark"
                                :placeholder="$t('Dictionary.placeholder.remark')"></el-input>
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
        <el-button size="small" type="primary" @click="handleSave('formDictionary')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import SelfTree from '@components/basis/BTree/SelfTree'
  import {DictionaryMixin} from "@/components/Dictionary/BDictionary/mixin/DictionaryMixin"

  export default {
    name: "Edit",
    mixins: [DictionaryMixin],
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
  .dialog-boday {
    height: 20rem;
  }

  .tree-module-wrapper-container {
    height: 20rem;
  }
</style>
