<!-- 部门列表详情 -->
<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)">
      <section slot="title">{{$t('SearchTips.detailedData')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formDepartment" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.owner')">
                      <label>{{formObject.organizeId}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.parentId')" prop="parentId">
                      <label>{{formParentText}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.enCode')">
                      <label>{{formObject.enCode}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.fullName')">
                      <label>{{formObject.fullName}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.shortName')">
                      <label>{{formObject.shortName}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.nature')">
                      <label>{{formObject.nature}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.outerPhone')">
                      <label>{{formObject.outerPhone}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.innerPhone')">
                      <label>{{formObject.innerPhone}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.email')">
                      <label>{{formObject.email}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.fax')">
                      <label>{{formObject.fax}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.layer')">
                      <label>{{formObject.layer}}</label>
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
  import {DepartmentMixin} from "@components/Base/BDepartment/mixin/DepartmentMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "Edit",
    data() {
      return {
        belongTo: 'two'
      };
    },
    mixins: [DepartmentMixin],
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
      },
      changebBelongTo(val){
        this.belongTo=val
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday {
    height: 25rem;
  }

  .tree-module-wrapper-container {
    height: 25rem;
  }
</style>
