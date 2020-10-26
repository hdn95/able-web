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
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllArea"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="AreasJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container">
              <el-form ref="formArea" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.parentId')">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('AreaManage.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.areaNumber')" prop="areaNumber">
                      <el-input v-model="formObject.areaNumber" type="text"
                                :placeholder="$t('AreaManage.placeholder.areaNumber')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.areaName')" prop="areaName">
                      <el-input v-model="formObject.areaName" type="text"
                                :placeholder="$t('AreaManage.placeholder.areaName')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.shortSpell')">
                      <el-input v-model="formObject.shortSpell" type="text"
                                :placeholder="$t('AreaManage.placeholder.shortSpell')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.level')">
                      <el-input v-model.number="formObject.level" type="text"
                                :placeholder="$t('AreaManage.placeholder.level')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('AreaManage.table.enable')">
                      <el-checkbox v-model="formObject.enabledMark" :true-label="1" :false-label="0">
                        {{$t('AreaManage.placeholder.enable')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item :label="$t('AreaManage.table.remark')">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                v-model="formObject.remarks"
                                :placeholder="$t('AreaManage.placeholder.remark')"></el-input>
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
        <el-button size="small" type="primary" @click="handleSave('formArea')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import SelfTree from '@components/basis/BTree/SelfTree'
  import {AreaMixin} from "@/components/AreaManage/BArea/mixin/AreaMixin"

  export default {
    name: "New",
    mixins: [AreaMixin],
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

  .form-module-wrapper-container .content-wrapper-container {
    margin-top: .5rem;
  }
</style>
