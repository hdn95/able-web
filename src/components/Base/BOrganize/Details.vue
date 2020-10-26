<!-- 机构列表详情 -->
<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)" width="60%">
      <section slot="title">{{$t('SearchTips.detailedData')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formOrganize" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.parentId')" prop="parentId">
                      <label>{{formParentText}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.category')" prop="category">
                      <label v-if="formObject.category===0">集团</label>
                      <label v-if="formObject.category===1">公司</label>
                      <label v-if="formObject.category===2">分公司</label>
                      <label v-if="formObject.category===3">子公司</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.enCode')">
                      <label>{{formObject.enCode}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.shortName')">
                      <label>{{formObject.shortName}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.fullName')" prop="fullName">
                      <label>{{formObject.fullName}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.nature')">
                      <label>{{formObject.nature}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.outerPhone')">
                      <label>{{formObject.outerPhone}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.innerPhone')">
                      <label>{{formObject.innerPhone}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.fax')">
                      <label>{{formObject.fax}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.postalcode')">
                      <label>{{formObject.postalcode}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.email')">
                      <label>{{formObject.email}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.webAddress')">
                      <label>{{formObject.webAddress}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.foundedTime')">
                      <label
                      :editable="false"
                      v-if="formObject.foundedTime"
                    >{{formObject.foundedTime.slice(0,10)}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.businessScope')">
                      <label>{{formObject.businessScope}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('Organize.table.layer')">
                      <label>{{formObject.layer}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="16">
                    <el-form-item :label="$t('Organize.table.address')" class="left-title">
                      <label class="right-content">{{formObject.address}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </section>
          </section>
        </section>
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
