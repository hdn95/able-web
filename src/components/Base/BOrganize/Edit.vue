<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)" width="60%">
      <section slot="title">{{$t('DefaultTips.editDataTitle')}}</section>

      <section class="dialog-boday" style='overflow-y: hidden;'>
        <section class="module-wrapper-container">
          <section class="tree-module-wrapper-container" v-loading="treeLoading">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

              <section class="right-title-module">
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                   @click="handleLoadAllOrganizes(true)"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="OrganizesJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%; overflow-y: auto">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formOrganize" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.parentId')" prop="parentId">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('Organize.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.category')" prop="category">
                      <el-select v-model="formObject.category" class="w-select">
                        <el-option v-for="item in organizeCategory"
                                   :key="item.key"
                                   :label="item.text"
                                   :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.enCode')">
                      <el-input v-model="formObject.enCode" type="text"
                                :placeholder="$t('Organize.placeholder.enCode')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.shortName')">
                      <el-input v-model="formObject.shortName" type="text"
                                :placeholder="$t('Organize.placeholder.shortName')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.fullName')" prop="fullName">
                      <el-input v-model="formObject.fullName" type="text"
                                :placeholder="$t('Organize.placeholder.fullName')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.nature')">
                      <el-input v-model="formObject.nature" type="text"
                                :placeholder="$t('Organize.placeholder.nature')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.outerPhone')">
                      <el-input v-model="formObject.outerPhone" type="text"
                                :placeholder="$t('Organize.placeholder.outerPhone')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.innerPhone')">
                      <el-input v-model="formObject.innerPhone" type="text"
                                :placeholder="$t('Organize.placeholder.innerPhone')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.fax')">
                      <el-input v-model="formObject.fax" type="text"
                                :placeholder="$t('Organize.placeholder.fax')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.postalcode')">
                      <el-input v-model="formObject.postalcode" type="text"
                                :placeholder="$t('Organize.placeholder.postalcode')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.email')">
                      <el-input v-model="formObject.email" type="text"
                                :placeholder="$t('Organize.placeholder.email')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.webAddress')">
                      <el-input v-model="formObject.webAddress" type="text"
                                :placeholder="$t('Organize.placeholder.webAddress')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.foundedTime')">
                      <el-date-picker type="date" v-model="formObject.foundedTime"
                                      :placeholder="$t('Organize.placeholder.foundedTime')"
                                      :editable="false"
                                      style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.businessScope')">
                      <el-input v-model="formObject.businessScope" type="text"
                                :placeholder="$t('Organize.placeholder.address')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.layer')">
                      <el-input v-model="formObject.layer" type="text"
                                :placeholder="$t('Organize.placeholder.layer')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item :label="$t('Organize.table.address')">
                      <el-input v-model="formObject.address" type="text"
                                :placeholder="$t('Organize.placeholder.address')"></el-input>
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
        <el-button size="small" type="primary" @click="handleSave('formOrganize')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {OrganizeMixin} from "@/components/Base/BOrganize/mixin/OrganizeMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "Edit",
    mixins: [OrganizeMixin],
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
    height: 35rem;
  }

  .tree-module-wrapper-container {
    height: 35rem;
  }
</style>
