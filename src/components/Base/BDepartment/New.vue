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
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllDepartments"></i>
              </section>
            </section>

            <!-- <section style="margin-top: 1rem">
              <self-tree :jsonData="DepartmentsJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section> -->
            
            <el-tabs v-model="belongTo">
              <el-tab-pane :label="$t('belongTo.organ')" name="two">
                <section style="margin-top: 1rem">
                  <self-tree :jsonData="OrganizesJsonTree" :treeProps="treeProps2"
                             @nodeClick="handleNodeClick2" style="margin-top: .35rem"></self-tree>
                </section>
              </el-tab-pane>
              <el-tab-pane :label="$t('belongTo.department')" name="one">
                <section style="margin-top: 1rem">
                  <self-tree :jsonData="DepartmentsJsonTree" :treeProps="treeProps"
                             @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
                </section>
              </el-tab-pane>
            </el-tabs>

          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container">
              <el-form ref="formDepartment" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <!-- <el-col :span="8">
                    <el-form-item :label="$t('Department.table.owner')" prop="organizeId">
                      <el-select v-model="formObject.organizeId" :placeholder="$t('Department.placeholder.owner')"
                                 filterable remote
                                 :loading="remoteLoading"
                                 :popper-append-to-body="false"
                                 :clearable="true"
                                 @focus="changebBelongTo('two')"
                                 :remote-method="handleRemoteOrganizes" style="width: 100%">
                        <el-option
                          v-for="item in remoteOrganizes"
                          :key="item.value"
                          :label="item.fullName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.owner')" prop="organizeId">
                      <el-input v-model="organizeName" type="text"
                                :placeholder="$t('Department.placeholder.owner')" @focus="changebBelongTo('two')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.parentId')" prop="parentId">
                      <el-input v-model="formParentText" type="text" :disabled="false"
                                :placeholder="$t('Department.placeholder.parentId')" @focus="changebBelongTo('one')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.enCode')" prop="enCode">
                      <el-input v-model="formObject.enCode" type="text"
                                :placeholder="$t('Department.placeholder.enCode')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.fullName')" prop="fullName">
                      <el-input v-model="formObject.fullName" type="text"
                                :placeholder="$t('Department.placeholder.fullName')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.shortName')">
                      <el-input v-model="formObject.shortName" type="text"
                                :placeholder="$t('Department.placeholder.shortName')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.nature')">
                      <el-input v-model="formObject.nature" type="text"
                                :placeholder="$t('Department.placeholder.nature')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.outerPhone')">
                      <el-input v-model="formObject.outerPhone" type="text"
                                :placeholder="$t('Department.placeholder.outerPhone')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.innerPhone')">
                      <el-input v-model="formObject.innerPhone" type="text"
                                :placeholder="$t('Department.placeholder.innerPhone')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.email')">
                      <el-input v-model="formObject.email" type="text"
                                :placeholder="$t('Department.placeholder.email')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.fax')">
                      <el-input v-model="formObject.fax" type="text"
                                :placeholder="$t('Department.placeholder.fax')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.layer')">
                      <el-input v-model="formObject.layer" type="text"
                                :placeholder="$t('Department.placeholder.layer')"></el-input>
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
        <el-button size="small" type="primary" @click="handleSave('formDepartment')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {DepartmentMixin} from "@/components/Base/BDepartment/mixin/DepartmentMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "New",
    mixins: [DepartmentMixin],
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
      },
      changebBelongTo(val){
        this.belongTo=val
      }
    },
    data () {
      return {
        formObject: {
          parentId: "0"
        },
        belongTo: 'two'
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
